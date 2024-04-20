import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { View } from 'react-native';
import { useState, createContext, useContext } from 'react';
import { Avatar, Card, IconButton, Button } from 'react-native-paper';




export default function App() {

  return (
    <SafeAreaProvider>
      <AppProvider>
        <SafeAreaView>
          <ListarProdutos></ListarProdutos>
          <Rodape></Rodape>
        </SafeAreaView>
      </AppProvider>
    </SafeAreaProvider>
  );
}


function Produto({ produto }) {
  const { removerDoCarrinho, adicionarAoCarrinho } = useAppContext();
  const nomePartido = produto.nome.split(' ');
  const primeiroNome = nomePartido[0];
  const ultimoNome = nomePartido[nomePartido.length - 1];
  const avatarLabel = (primeiroNome[0] + (nomePartido.length > 1 ? ultimoNome[0] : '')).toUpperCase();
  const valorFormatado = produto.preco ? `R$ ${produto.preco.toFixed(2)}` : 'R$ 0.00';
  return (

    <Card>
      <Card.Title
        title={produto.nome}
        subtitle={produto.descricao}
        left={() => (
          <View>
            <Avatar.Text size={40} label={avatarLabel} />
          </View>
        )}
        right={() => (valorFormatado)}
      />
      <Button onPress={() => (adicionarAoCarrinho(produto))}>Adicionar</Button>
      <Button onPress={() => (removerDoCarrinho(produto))}>Excluir</Button>
    </Card>

  );
};

const AppContext = createContext();

function AppProvider({
  children
}) {
  const [produtos, setProdutos] = useState([
    { id: 1, nome: 'Jogar Futebol', descricao: 'Estudar para a Prova', preco: 9.99 },
    { id: 2, nome: 'Estudar para a Prova', descricao: 'Estudar para a Prova', preco: 11 }
  ]);

  const [carrinho, setCarrinho] = useState(0);
  const adicionarAoCarrinho = (produto) => {
    const valorItem = produto.preco;
    setCarrinho(carrinho + valorItem); 

    console.log(carrinho);
  };

  const removerDoCarrinho = (produto) => {
    const valorItem = produto.preco; // Não é necessário usar desestruturação aqui
    setCarrinho(carrinho - valorItem); // Atualizar o estado do carrinho
    console.log(carrinho);
  };
  return (
    <AppContext.Provider
      value={{ produtos, adicionarAoCarrinho, removerDoCarrinho }}
    >
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
  const { valorCarrinho } = useAppContext();
  const valorFormatado = valorCarrinho ? `R$ ${valorCarrinho.toFixed(2)}` : 'R$ 0.00'; 
  return (
    <Card>
      <Card.Title title={valorFormatado} subtitle="Valor total"></Card.Title>
    </Card>
  );
}

