import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { useState, createContext, useContext } from 'react';
import { Avatar, Card, IconButton, Text } from 'react-native-paper';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <SafeAreaView>
          <Text variant="displayMedium">AXGR Store</Text>
          <ListarProdutos />
          <Rodape />
        </SafeAreaView>
      </AppProvider>
    </SafeAreaProvider>
  );
}

function Produto({ produto }) {
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
}


const AppContext = createContext();

function AppProvider({ children }) {
  const [produtos, setProdutos] = useState([
    { id: 1, nome: 'Prato Branco', descricao: ' Um prato clássico, elegante e versátil, perfeito para refeições do dia a dia ou ocasiões especiais.', preco: 9.99 },
    { id: 2, nome: 'Estojo', descricao: ' Feito com materiais duráveis e design inteligente, este estojo é essencial para estudantes de todas as idades.', preco: 11 },
    { id: 3, nome: 'Necessaire vegana', descricao: ' Feito com materiais duráveis e design inteligente, este estojo é essencial para estudantes de todas as idades.', preco: 21 }
  ]);

  const [produtoCarrinho, setProdutoCarrinho] = useState([]);
  const [carrinhoTotal, setCarrinhoTotal] = useState(0);
  const [carrinhoIdCounter, setCarrinhoIdCounter] = useState(1);

  const adicionarAoCarrinho = (produto) => {
    const produtoNoCarrinho = { ...produto, carrinhoId: carrinhoIdCounter };
    setProdutoCarrinho(prevProdutoCarrinho => [...prevProdutoCarrinho, produtoNoCarrinho]);
    setCarrinhoIdCounter(prevCounter => prevCounter + 1);
    setCarrinhoTotal(prevTotal => prevTotal + produto.preco);
    
  };
  console.log('produtoCarrinho: ',produtoCarrinho );
  const removerDoCarrinho = (produto) => {
    console.log(produto.id)
    let idProdutoRemover = produtoCarrinho.indexOf((item) => item.id == 1);
    console.log('idProdutoRemover: ', idProdutoRemover);
    let newList = produtoCarrinho;
    console.log('newList: ', newList);
    console.log('lista pos remover: ', newList.splice(1, 1));
    setProdutoCarrinho(produtoCarrinho.filter(produte => produte.id !== produto.id));
    console.log('novoProdutoCarrinho: ',produtoCarrinho);
    setCarrinhoTotal(prevTotal => prevTotal - produto.preco);
  };

  return (
    <AppContext.Provider value={{ produtos, adicionarAoCarrinho, removerDoCarrinho, produtoCarrinho, carrinhoTotal}}>
      {children}
    </AppContext.Provider>
  );
}

const useAppContext = () => useContext(AppContext);

function ListarProdutos() {
  const { produtos } = useAppContext();
  return produtos.map(produto => (
    <Produto key={produto.id} produto={produto} />
  ));
}

function Rodape() {
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
