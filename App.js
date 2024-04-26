import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { useState, createContext, useContext } from 'react';
import { Avatar, Card, IconButton, Button, Text, TouchableRipple } from 'react-native-paper';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <SafeAreaView>
          <ListarProdutos />
          <Rodape />
        </SafeAreaView>
      </AppProvider>
    </SafeAreaProvider>
  );
}

function Produto({ produto }) {
  const nomePartido = produto.nome.split(' ');
  const primeiroNome = nomePartido[0];
  const ultimoNome = nomePartido[nomePartido.length - 1];
  const avatarLabel = (primeiroNome[0] + (nomePartido.length > 1 ? ultimoNome[0] : '')).toUpperCase();
  const valorFormatado = produto.preco ? `R$ ${produto.preco.toFixed(2)}` : 'R$ 0.00';
  const { removerDoCarrinho, adicionarAoCarrinho, produtoCarrinho } = useAppContext();
  const isProdutoNoCarrinho = produtoCarrinho.some(item => item.id === produto.id);

  return (
    <Card style={{padding:10, margin:5, borderColor:'grey', backgroundColor:'white', borderStyle:"solid 2px"}}>
      <Card.Title
        title={produto.nome}
        subtitle={
          <View>
            <Text>{produto.descricao}</Text>
            <Text><b>{valorFormatado}</b></Text>
          </View>
        }
        left={() => (
          <View>
            <Avatar.Text size={40} label={avatarLabel} color= {'white'}style={{ backgroundColor: '#ec7434', color: 'white' }} />
          </View>
        )}
        right={() => (
          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}> {/* Empilha os botões verticalmente */}
            <IconButton
              icon="plus"
              iconColor="white"
              size={15}
              style={{ backgroundColor: 'black', borderRadius: 50, color: "white", marginBottom: 8 }} // Adiciona margem inferior para separar os botões
              onPress={() => adicionarAoCarrinho(produto)}
            />
            {isProdutoNoCarrinho && (
              <IconButton
                icon="minus"
                iconColor="white"
                size={15}
                style={{ backgroundColor: 'black', borderRadius: 50, color: "white" }}
                onPress={() => removerDoCarrinho(produto.carrinhoId)}
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
    { id: 1, nome: 'Prato Branco', descricao: 'Estudar para a Prova', preco: 9.99 },
    { id: 2, nome: 'Estojo', descricao: 'Estudar para a Prova', preco: 11 }
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

  const removerDoCarrinho = (carrinhoId, preco) => {
    setProdutoCarrinho(prevProdutoCarrinho => prevProdutoCarrinho.filter(item => item.carrinhoId !== carrinhoId));
    setCarrinhoTotal(prevTotal => prevTotal - preco);
  };

  return (
    <AppContext.Provider value={{ produtos, adicionarAoCarrinho, removerDoCarrinho, produtoCarrinho, carrinhoTotal }}>
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
    <Card style={{padding:10, backgroundColor:"#f3f3f3"}}>
      <Card.Title
        title="Total da Compra"
        left={() => (
          <Avatar.Icon size={50} icon="cart" color="black" style={{ backgroundColor: "transparent", color: 'black' }} /> // Adiciona o ícone de carrinho de supermercado
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
