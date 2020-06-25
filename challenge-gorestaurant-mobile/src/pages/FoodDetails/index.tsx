import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
  useContext,
} from 'react';
import { Image, Alert } from 'react-native';
import { ThemeContext } from 'styled-components';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

import formatValue from '../../utils/formatValue';
import { useTheme } from '../../hooks/theme';
import api from '../../services/api';

import {
  Container,
  Header,
  ScrollContainer,
  FoodsContainer,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
  AdditionalsContainer,
  Title,
  TotalContainer,
  AdittionalItem,
  AdittionalItemText,
  AdittionalQuantity,
  PriceButtonContainer,
  TotalPrice,
  QuantityContainer,
  FinishOrderButton,
  ButtonText,
  IconContainer,
} from './styles';

interface Params {
  id: number;
}

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
  extras: Extra[];
}

const FoodDetails: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  const [food, setFood] = useState({} as Food);
  const [extras, setExtras] = useState<Extra[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [foodQuantity, setFoodQuantity] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    async function loadFood(): Promise<void> {
      const response = await api.get<Food>(`foods/${routeParams.id}`);
      setFood({
        ...response.data,
        formattedPrice: formatValue(response.data.price),
      });

      setExtras(
        response.data.extras.map(extra => ({
          ...extra,
          quantity: 0,
        })),
      );
    }

    loadFood();
  }, [routeParams]);

  useEffect(() => {
    api.get<Food[]>('favorites').then(({ data }) => {
      data.forEach(favorite => {
        if (favorite.name === food.name) {
          setIsFavorite(true);
        }
      });
    });
  }, [food]);

  function handleIncrementExtra(id: number): void {
    setExtras(oldExtras =>
      oldExtras.map(extra =>
        extra.id === id ? { ...extra, quantity: extra.quantity + 1 } : extra,
      ),
    );
  }

  function handleDecrementExtra(id: number): void {
    const extraToDecrement = extras.find(extra => extra.id === id);

    if (extraToDecrement?.quantity === 0) return;

    setExtras(oldExtras =>
      oldExtras.map(extra =>
        extra.id === id ? { ...extra, quantity: extra.quantity - 1 } : extra,
      ),
    );
  }

  function handleIncrementFood(): void {
    setFoodQuantity(oldQuantity => oldQuantity + 1);
  }

  function handleDecrementFood(): void {
    if (foodQuantity === 1) return;

    setFoodQuantity(oldQuantity => oldQuantity - 1);
  }

  const toggleFavorite = useCallback(async () => {
    try {
      if (isFavorite) {
        await api.delete(`favorites/${routeParams.id}`);
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
  }, [isFavorite, food, routeParams.id]);

  const cartTotal = useMemo(() => {
    const totalExtras = extras.reduce((total, next) => {
      return total + next.value * next.quantity;
    }, 0);
    const totalPrice = foodQuantity * food.price + totalExtras;

    return formatValue(totalPrice);
  }, [extras, food, foodQuantity]);

  async function handleFinishOrder(): Promise<void> {
    const order = {
      product_id: food.id,
      name: food.name,
      description: food.description,
      price: food.price,
      category: food.category,
      image_url: food.image_url,
      thumbnail_url: food.image_url,
      foodQuantity,
      extras: extras.filter(extra => extra.quantity > 0),
      total: cartTotal,
    };

    try {
      api.post('orders', order);

      navigation.navigate('Orders');
    } catch (err) {
      Alert.alert('Erro ao realizar pedido.', err);
    }
  }

  const favoriteIconName = useMemo(
    () => (isFavorite ? 'favorite' : 'favorite-border'),
    [isFavorite],
  );

  useLayoutEffect(() => {
    // Add the favorite icon on the right of the header bar
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
    <Container>
      <Header />

      <ScrollContainer>
        <FoodsContainer>
          <Food>
            <FoodImageContainer>
              <Image
                style={{ width: 327, height: 183 }}
                source={{
                  uri: food.image_url,
                }}
              />
            </FoodImageContainer>
            <FoodContent>
              <FoodTitle>{food.name}</FoodTitle>
              <FoodDescription>{food.description}</FoodDescription>
              <FoodPricing>{food.formattedPrice}</FoodPricing>
            </FoodContent>
          </Food>
        </FoodsContainer>
        <AdditionalsContainer>
          <Title>Adicionais</Title>
          {extras.map(extra => (
            <AdittionalItem key={extra.id}>
              <AdittionalItemText>{extra.name}</AdittionalItemText>
              <AdittionalQuantity>
                <Icon
                  size={15}
                  color={colors.text}
                  name="minus"
                  onPress={() => handleDecrementExtra(extra.id)}
                  testID={`decrement-extra-${extra.id}`}
                />
                <AdittionalItemText testID={`extra-quantity-${extra.id}`}>
                  {extra.quantity}
                </AdittionalItemText>
                <Icon
                  size={15}
                  color={colors.text}
                  name="plus"
                  onPress={() => handleIncrementExtra(extra.id)}
                  testID={`increment-extra-${extra.id}`}
                />
              </AdittionalQuantity>
            </AdittionalItem>
          ))}
        </AdditionalsContainer>
        <TotalContainer>
          <Title>Total do pedido</Title>
          <PriceButtonContainer>
            <TotalPrice testID="cart-total">{cartTotal}</TotalPrice>
            <QuantityContainer>
              <Icon
                size={15}
                color={colors.text}
                name="minus"
                onPress={handleDecrementFood}
                testID="decrement-food"
              />
              <AdittionalItemText testID="food-quantity">
                {foodQuantity}
              </AdittionalItemText>
              <Icon
                size={15}
                color={colors.text}
                name="plus"
                onPress={handleIncrementFood}
                testID="increment-food"
              />
            </QuantityContainer>
          </PriceButtonContainer>

          <FinishOrderButton onPress={() => handleFinishOrder()}>
            <ButtonText>Confirmar pedido</ButtonText>
            <IconContainer>
              <Icon name="check-square" size={24} color="#fff" />
            </IconContainer>
          </FinishOrderButton>
        </TotalContainer>
      </ScrollContainer>
    </Container>
  );
};

export default FoodDetails;
