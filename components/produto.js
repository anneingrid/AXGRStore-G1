import { Avatar, Card, IconButton } from 'react-native-paper';

export default function Produto({produto}) {
    const { removerDoCarrinho, adicionarAoCarrinho, produtoCarrinho } = useAppContext();
    const nomePartido = produto.nome.split(' ');
    const primeiroNome = nomePartido[0];
    const ultimoNome = nomePartido[nomePartido.length - 1];
    const avatarLabel = (primeiroNome[0] + (nomePartido.length > 1 ? ultimoNome[0] : '')).toUpperCase();
    const valorFormatado = produto.preco ? `R$ ${produto.preco.toFixed(2)}` : 'R$ 0.00';
    const isProdutoNoCarrinho = produtoCarrinho.some(item => item.id === produto.id);
    console.log(isProdutoNoCarrinho);
    return (
      <Card style={{ padding: 10, margin: 5, borderColor: 'grey', backgroundColor: 'white', borderStyle: "solid 2px" }}>
        <Card.Title
          title={produto.nome}
          subtitle={
            <View>
              <Text numberOfLines={1}>{produto.descricao}</Text>
              <Text><b>{valorFormatado}</b></Text>
            </View>
          }
          left={() => (
            <View>
              <Avatar.Text size={40} label={avatarLabel} color={'white'} style={{ backgroundColor: '#ec7434', color: 'white' }} />
            </View>
          )}
          right={() => (
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <IconButton
                icon="plus"
                iconColor="white"
                size={15}
                style={{ backgroundColor: 'black', borderRadius: 50, color: "white", marginBottom: 8 }}
                onPress={() => adicionarAoCarrinho(produto)}
              />
              {isProdutoNoCarrinho && (
                <IconButton
                  icon="minus"
                  iconColor="white"
                  size={15}
                  style={{ backgroundColor: 'black', borderRadius: 50, color: "white" }}
                  onPress={() => removerDoCarrinho( produto)}
                />
              )}
            </View>
          )}
        />
      </Card>
    );
};