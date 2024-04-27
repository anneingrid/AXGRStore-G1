import { useState, createContext, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({
    children
}) {
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
        // console.log(,produtoCarrinho );
        // const novoProdutoCarrinho = produtoCarrinho.splice(produtoCarrinho.indexOf(produto.id),1);
        
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
export const useAppContext = () => useContext(AppContext);