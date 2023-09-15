import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,TextInput, Picker } from 'react-native';
import CardsService from './services/card.service';
import CategoryService from './services/category.service';

export default function App() {

  // const [cards, setCards] = useState([]);
  // const getAllResponse = await CardsService.getAll();
  // setCards(getAllResponse.data);

  const [nextCard, setNextCard] = useState();
  const [error, setError] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false)
  const [newCard, setNewCard] = useState({id: 0 , question: '', answer: '', categoryId: 0});
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({name: ''});
  const [selectedCatValue, setSelectedCatValue] = useState("Category..");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const getAllCategories = await CategoryService.getAll();
      const getNextResponse = await CardsService.getNext();
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
      setNewCard({ answer: "", question: "" })
    } catch (error) {
      setError(error.message);
    }
  }

  const editCard = async() => {
    try{
      const updatedCard = { ...newCard, id: nextCard.id, categoryId: nextCard.categoryId }; 
      await CardsService.update(updatedCard);
      setNewCard({ id: 0, question: '', answer: '', categoryId: 0 });
    } catch (error) {
      setError(error.message);
    }
  }

  
  const deleteCard = async() => {
    try{
      await CardsService.remove(nextCard.id);
    } catch (error) {
      setError(error.message);
    }
  }

  const createCategory = async() => {
    try{
      await CategoryService.create(newCategory)
      setNewCategory({ name: "" })
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
            <div style={styles.card}><Text style={styles.cardText}>{nextCard.question}</Text></div>
            {(showAnswer === true) ?
            <>
              <div style={styles.card}><Text style={styles.cardText}>{nextCard.answer}</Text></div>
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

      <TextInput
        placeholder="Dodaj kategorię"
        value={newCategory.name}
        onChangeText={text => setNewCategory({name: text })}
      />
      <Button title="Dodaj" onPress={createCategory}/>

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
      <Button title="Edytuj" onPress={editCard}/>
      <Button title="Usuń" onPress={deleteCard}/>
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