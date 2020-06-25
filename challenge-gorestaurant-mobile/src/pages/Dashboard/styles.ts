import styled, { css } from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

interface CategoryItemProps {
  isSelected?: boolean;
}

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  padding: 60px 24px 60px;
  background: #c72828;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const FilterContainer = styled.View`
  padding: 0 24px;
  margin-top: -28px;
`;

export const Title = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: ${({ theme }) => theme.colors.title};
  padding: 0 20px;
`;

export const CategoryContainer = styled.View`
  margin-top: 40px;
  position: relative;
`;

export const ToggleThemeButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 15px;
  top: 0;
`;

export const ThemeIcon = styled(Icon).attrs({
  size: 30,
  color: '#feb72b',
})``;

export const CategorySlider = styled.ScrollView`
  margin-top: 16px;
`;

export const CategoryItem = styled.TouchableOpacity<CategoryItemProps>`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border: 2px;
  border-color: ${({ theme }) => theme.colors.cardBackground};
  height: 120px;
  width: 120px;
  border-radius: 8px;
  padding-top: 20px;
  padding-bottom: 16px;
  margin-right: 8px;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  ${props =>
    props.isSelected &&
    css`
      border-color: #c72828;
      background-color: ${({ theme }) => theme.colors.selected};
    `}
`;

export const CategoryItemTitle = styled.Text`
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

export const FoodsContainer = styled.View`
  margin-top: 40px;
`;

export const FoodList = styled.View`
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
  min-height: 100px;
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
