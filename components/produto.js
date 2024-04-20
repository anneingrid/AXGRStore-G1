import { Avatar, Card, IconButton } from 'react-native-paper';

export default function Produto({produto}) {

    // const nomePartido = produto.nome.split(' ');
    // const primeiroNome = nomePartido[0];
    // const ultimoNome = nomePartido[nomePartido.length - 1];
    // const avatarLabel = (primeiroNome[0] + (nomePartido.length > 1 ? ultimoNome[0] : '')).toUpperCase();
    return (
        <View>
        <Card>
            <Card.Title
                title={produto.nome}
                subtitle={produto.descricao}
            />
        </Card>
        </View>
    );
};