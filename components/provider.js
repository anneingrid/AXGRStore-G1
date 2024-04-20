import { useState, createContext, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({
    children
}) {
    const [produtos, setProdutos] = useState([
        { id: 1, nomeProduto: 'Jogar Futebol', descricao: 'Estudar para a Prova', preco: '9.99' },
        { id: 2, nomeProduto: 'Estudar para a Prova', descricao: 'Estudar para a Prova', preco: '11' }
    ]);

    const [carrinho, setCarrinho] = useState(0);
    const adicionarAoCarrinho = (produto) => {
        const [valorItem, setValorItem] = produto.preco;
        carrinho = carrinho + valorItem;
    };

    const removerDoCarrinho = (produto) => {
        const [valorItem, setValorItem] = produto.preco;
        carrinho = carrinho - valorItem;
    };
    return (
        <AppContext.Provider
            value={{ produtos, adicionarAoCarrinho }}
        >
            {children}
        </AppContext.Provider>
    );
}
export const useAppContext = () => useContext(AppContext);