# Projeto Limpo React Native
Esse é um repositório com um projeto iniciado de React Native para desenvolvimento mobile!

## Para iniciar:
- npm install (Instala todas as dependências do projeto)
- npx expo start (Inicia o projeto, provavelmente vai dar errado)
- Se der erro:
  - npx expo install react-dom react-native-web@expo/webpack-config (**1ª** opção)
  - npx expo install react-native-web react-dom @expo/metro-runtime (**2ª** opção)
  - npx expo start
  - w (para abrir no navegador)
- Se der erro:
  - npm install --global @expo/ngrok
  - npx expo start --tunnel
