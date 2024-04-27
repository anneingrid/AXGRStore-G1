import { Avatar, Card, IconButton, Text } from 'react-native-paper';

export default function Rodape() {
    const { carrinhoTotal } = useAppContext();
    return (
      <Card style={{ padding: 10, backgroundColor: "#f3f3f3" }}>
        <Card.Title
          title="Total da Compra"
          left={() => (
            <Avatar.Icon size={50} icon="cart" color="black" style={{ backgroundColor: "transparent", color: 'black' }} />
          )}
          right={() => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={{ fontSize: 22 }}><b>{`R$ ${carrinhoTotal.toFixed(2)}`}</b></Text>
            </View>
          )}
        />
      </Card>
    );
  }
  