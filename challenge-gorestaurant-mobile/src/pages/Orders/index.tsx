import React, { useEffect, useState, useCallback } from 'react';
import { Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import formatValue from '../../utils/formatValue';

import {
  Container,
  Header,
  HeaderTitle,
  FoodsContainer,
  FoodList,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
} from './styles';

interface Extra {
  id: number;
  name: string;
  value: number;
  quantity: number;
}

export interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail_url: string;
  formattedPrice: string;
  total: string;
  foodQuantity: number;
  extras: Extra[];
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Food[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function loadOrders(): Promise<void> {
      const { data } = await api.get<Food[]>('orders');

      setOrders(
        data.map(food => ({
          ...food,
          formattedPrice: formatValue(food.price),
        })),
      );
    }

    loadOrders();
  }, []);

  const handleNavigate = useCallback(
    (food: Food) => {
      navigation.navigate('OrderDetails', { ...food });
    },
    [navigation],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>Meus pedidos</HeaderTitle>
      </Header>

      <FoodsContainer>
        <FoodList
          data={orders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Food
              key={item.id}
              activeOpacity={0.6}
              onPress={() => handleNavigate(item)}
            >
              <FoodImageContainer>
                <Image
                  style={{ width: 88, height: 88 }}
                  source={{ uri: item.thumbnail_url }}
                />
              </FoodImageContainer>
              <FoodContent>
                <FoodTitle>{item.name}</FoodTitle>
                <FoodDescription>{item.description}</FoodDescription>
                <FoodPricing>{item.formattedPrice}</FoodPricing>
              </FoodContent>
            </Food>
          )}
        />
      </FoodsContainer>
    </Container>
  );
};

export default Orders;
