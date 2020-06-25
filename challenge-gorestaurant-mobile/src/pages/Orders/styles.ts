import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Food as FoodProps } from '.';

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  padding: 60px 24px 60px;
  background: #c72828;

  display: flex;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #fff;
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

export const FoodsContainer = styled.View`
  flex: 1;
  margin-top: -60px;
`;

export const FoodList = styled(FlatList as new () => FlatList<FoodProps>)`
  flex: 1;
  padding: 0 20px;

  margin-top: 16px;
`;

export const Food = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;

  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 8px;

  margin-bottom: 16px;
`;

export const FoodImageContainer = styled.View`
  background: #ffb84d;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  padding: 16px;

  height: 100%;
`;

export const FoodContent = styled.View`
  flex: 1;

  padding: 16px;
`;
export const FoodTitle = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;

  color: ${({ theme }) => theme.colors.title};
`;
export const FoodDescription = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 16px;

  margin-top: 6px;

  color: ${({ theme }) => theme.colors.title};
`;

export const FoodPricing = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;

  margin-top: 8px;

  font-weight: 600;

  color: #39b100;
`;
