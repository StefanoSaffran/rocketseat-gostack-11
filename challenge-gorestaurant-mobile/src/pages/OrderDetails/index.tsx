import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
} from 'react';
import { Image, Alert } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import formatValue from '../../utils/formatValue';

import api from '../../services/api';

import * as S from './styles';

interface Extra {
  id: number;
  name: string;
  value: number;
  quantity: number;
}

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  category: number;
  image_url: string;
  thumbnail_url: string;
  formattedPrice: string;
  foodQuantity: string;
  extras?: Extra[];
  total: string;
}

const OrderDetails: React.FC = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();

  const food = route.params as Food;

  useEffect(() => {
    api.get<Food[]>('favorites').then(({ data }) => {
      data.forEach(favorite => {
        if (favorite.name === food.name) {
          setIsFavorite(true);
        }
      });
    });
  }, [food]);

  const toggleFavorite = useCallback(async () => {
    try {
      if (isFavorite) {
        await api.delete(`favorites/${food.id}`);
      } else {
        const newFavorite = {
          id: food.id,
          name: food.name,
          description: food.description,
          price: food.price,
          category: food.category,
          image_url: food.image_url,
          thumbnail_url: food.thumbnail_url,
          extras: food.extras,
        };

        await api.post('favorites', newFavorite);
      }
    } catch (err) {
      Alert.alert('Erro ao tentar favoritar prato.', err);
    }

    setIsFavorite(!isFavorite);
  }, [isFavorite, food]);

  const favoriteIconName = useMemo(
    () => (isFavorite ? 'favorite' : 'favorite-border'),
    [isFavorite],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MaterialIcon
          name={favoriteIconName}
          size={24}
          color="#FFB84D"
          onPress={() => toggleFavorite()}
        />
      ),
    });
  }, [navigation, favoriteIconName, toggleFavorite]);

  return (
    <S.Container>
      <S.Header />

      <S.ScrollContainer>
        <S.FoodsContainer>
          <S.Food>
            <S.FoodImageContainer>
              <Image
                style={{ width: 327, height: 183 }}
                source={{
                  uri: food.thumbnail_url,
                }}
              />
            </S.FoodImageContainer>
            <S.FoodContent>
              <S.FoodTitle>{food.name}</S.FoodTitle>
              <S.FoodDescription>{food.description}</S.FoodDescription>
            </S.FoodContent>
          </S.Food>

          <S.TitleDetails>Detalhes do pedido</S.TitleDetails>

          <S.DetailsHeader>
            <S.Left>
              <S.Tag>Qtd</S.Tag>
              <S.Tag>Produto</S.Tag>
            </S.Left>
            <S.Right>
              <S.Tag>Valor unitário</S.Tag>
            </S.Right>
          </S.DetailsHeader>

          <S.DetailsBody>
            <S.LeftBody>
              <S.TagBody>{food.foodQuantity}</S.TagBody>
              <S.TagBody>{food.name}</S.TagBody>
            </S.LeftBody>
            <S.Right>
              <S.TagBody>{food.formattedPrice}</S.TagBody>
            </S.Right>
          </S.DetailsBody>

          {food.extras &&
            food.extras.map(extra => (
              <S.DetailsBody key={extra.id}>
                <S.LeftBody>
                  <S.TagBody>{extra.quantity}</S.TagBody>
                  <S.TagBody>{extra.name}</S.TagBody>
                </S.LeftBody>
                <S.Right>
                  <S.TagBody>{formatValue(extra.value)}</S.TagBody>
                </S.Right>
              </S.DetailsBody>
            ))}

          <S.Separator />

          <S.TotalContainer>
            <S.Title>Total</S.Title>
            <S.PriceButtonContainer>
              <S.TotalPrice testID="cart-total">{food.total}</S.TotalPrice>
            </S.PriceButtonContainer>
          </S.TotalContainer>
        </S.FoodsContainer>
      </S.ScrollContainer>
    </S.Container>
  );
};

export default OrderDetails;
