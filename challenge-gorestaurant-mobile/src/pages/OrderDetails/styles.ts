import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  padding: 40px 24px 20px;
  background: #c72828;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 40,
  },
})`
  margin-top: -40px;
`;

export const FoodsContainer = styled.View`
  padding: 0 24px;
`;

export const Food = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const FoodImageContainer = styled.View`
  background: #ffb84d;
  overflow: hidden;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

export const FoodContent = styled.View`
  padding: 24px;
  justify-content: space-between;
  flex: 1;
`;

export const FoodTitle = styled.Text`
  font-family: 'Poppins-Regular';
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  color: ${({ theme }) => theme.colors.title};
`;

export const FoodDescription = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 25px;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.title};
`;

export const FoodPricingContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const FoodPricing = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  color: #39b100;
  margin-top: 8px;
  font-weight: 600;
`;

export const TitleDetails = styled.Text`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  margin: 15px 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.titleAlternative};
`;

export const DetailsHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Left = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 30%;
`;

export const Right = styled.View``;

export const Tag = styled.Text`
  color: ${({ theme }) => theme.colors.titleAlternative};
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
`;

export const DetailsBody = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-left: 9px;
`;

export const LeftBody = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 28%;
`;

export const TagBody = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
`;

export const Separator = styled.View`
  height: 1px;
  background: ${({ theme }) => theme.colors.titleAlternative};
  opacity: 0.2;
  margin: 10px 0 10px;
`;

export const Title = styled.Text`
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 30px;
  color: ${({ theme }) => theme.colors.titleAlternative};
`;

export const PriceButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TotalContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const TotalPrice = styled.Text`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  color: #39b100;
  margin-top: auto;
`;
