import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { LanguageSelection } from './pages/LanguageSelection'
import { Content } from './pages/Content'
import { Study } from './pages/Study'
import { Flashcards } from './pages/FlashCards'
import { Alphabets } from './pages/Alphabets'
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'

function App() {
  const [language, setLanguage] = useState("")

  return (
    <div className="app-layout">
      <Navbar language={language} />
      <Routes>
        <Route path="/" element={<LanguageSelection setLanguage={setLanguage} />} />
        <Route path="/home" element={<Home language={language} />} />
        <Route path="/content" element={<Content />} />
        <Route path="/study" element={<Study />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/alphabets" element={<Alphabets />} />
      </Routes>
    </div>
  )
}

export default App

  /*
  ORGANIZANDO O SITE:
  Features:
  - Flashcard revisionais tipo anki
  - Conteúdo separado por nível de proeficência utlizando legendas com IA que  mostra a traducao/significado das palavras quando clicado
  - Exercicios tipo duolingo
  - Mecanismo para ensinar o alfabeto de linguagens diferentes, minha ideia inicial é um pouco dessa

  PASSO A PASSO:
  1- Tela de Login (V2)
  2- Escolha de qual língua (Inicialmente: português, inglês e francês)
  3- Tela principal que permite o acesso as diferentes features (cada uma com sua "página própria")
    |                     |                 |                         |
    |                     |                 |                         |
  Área dos flashcards   Exercícios     Conteúdo por proeficiência    Mecanismo de aprendizagem de alfabetos
                                                |
                                                |
                                          Teste/escolha do nível do usuário
                                                |
                                                |
                                          Conteúdo nivelado com legenda inteligente

  ESBOÇO DO BACKEND:
  - Guarda os dados usuário na criação da conta e depois no login confere se os dados batem
  - Flashcards: coleção de cards com dados pré-estabelcidos no MongoDB, exibí-los em um método de revisão espaçada
  - Exercícios: ???
  - Conteúdo por proeficência: cada língua têm um conteúdo próprio por nível de experiência, que é entregue ao usuário após seu "teste"
  - Mecanismo de alfabetos: ???

  Frontend (React)
        │
        ▼
Backend API (Express)
        │
        ▼
      MongoDB
  */
