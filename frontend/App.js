import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,TextInput, Picker } from 'react-native';
import CardsService from './services/card.service';
import CategoryService from './services/category.service';

export default function App() {

  const [cards, setCards] = useState([]);
  const [nextCard, setNextCard] = useState();
  const [error, setError] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false)
  const [newCard, setNewCard] = useState({question: '', answer: '', categoryId: 1});
  const [categories, setCategories] = useState([]);
  const [selectedCatValue, setSelectedCatValue] = useState("Category..");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const getAllResponse = await CardsService.getAll();
      const getAllCategories = await CategoryService.getAll();
      const getNextResponse = await CardsService.getNext();
      setCards(getAllResponse.data);
      setNextCard(getNextResponse.data);
      setCategories(getAllCategories.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const getNextCard = async () => {
    try {
      await CardsService.addRepeatInfo(nextCard.id);
      const getNextResponse = await CardsService.getNext();
      setNextCard(getNextResponse.data);
      setShowAnswer(false);
    } catch (error) {
      setError(error.message);
    }
  }

  const checkAnswer = async () => {
    setShowAnswer(true);
  }

  const createCard = async() => {
    try{
      await CardsService.create(newCard)
      console.log(newCard.question);
      console.log(newCard.answer);
      console.log(newCard.categoryId);
      setNewCard({ answer: "", question: "" })
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <div>
        <Text style={styles.categoryName}>Losowa karta</Text>
        {nextCard && 
         <>
            <div style={styles.card}><Text style={styles.cardText}>Pytanie: {nextCard.question}</Text></div>
            {(showAnswer === true) ?
            <>
              <div style={styles.card}><Text style={styles.cardText}>Odpowiedź: {nextCard.answer}</Text></div>
              <Button title="Next" onPress = {getNextCard}/>
            </>
            : <Button title="Check" onPress={checkAnswer}/>}
         </>
        }
      </div>
      
      {/* <Text>Lista kart</Text>
      {error && <Text>Błąd: {error}</Text>}
      {cards.map(card => (
        <View key={card.id}>
          <Text>Pytanie: {card.question}</Text>
          <Text>Odpowiedź: {card.answer}</Text>
        </View>
      ))} */}
      {/* Dorzucę tutaj opcje dodawania karty */}

      <Picker
        selectedValue={selectedCatValue}
        onValueChange={(itemValue) => {
          setSelectedCatValue(itemValue);
          setNewCard({...newCard, categoryId: itemValue})}
        } 
      >
        {categories.map((cat) => (
          <Picker.Item key={cat.id} value={cat.id} label={cat.name} />
        ))}
      </Picker>

      <TextInput
        placeholder="Pytanie"
        value={newCard.question}
        onChangeText={text => setNewCard({ ...newCard, question: text })}
      />
      <TextInput
        placeholder="Odpowiedź"
        value={newCard.answer}
        onChangeText={text => setNewCard({ ...newCard, answer: text })}
      />
      <Button title="Dodaj" onPress={createCard}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#544172',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  },
  card: {
    width: 272,
    height: 138,
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(210, 176, 237, 0.28)',
    boxShadow: '0 4 4 0 rgba(0, 0, 0, 0.50)',
    margin: 10,
  },
  cardText:{
    display: 'flex',
    width: 260,
    height: 115,
    flexDirection: 'column',
    justifyContent: 'center',
    flexShrink: 0,
    color: '#C6ABDB',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
  },
  categoryName: {
    display: 'flex',
    width: 266,
    height: 40,
    flexDirection: 'column',
    justifyContent: 'center',
    flexShrink: 0,
    color: '#D9D2FF',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
  },
});