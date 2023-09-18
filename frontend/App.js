import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,TextInput, Pressable , FlatList, TouchableOpacity} from 'react-native';
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
  const [categoryName, setCategoryName] = useState();


  useEffect(() => {
    fetchData();
    getNextCard();
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
      setCategoryName(categories.find(category => category.id === nextCard.categoryId)?.name)
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
      debugger;
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

    const [inputText, setInputText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // const allSuggestions = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig'];

    const filterSuggestions = (text) => {
      const filteredSuggestions = categories.filter((category) =>
      category.name.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    };

    const handleInputChange = (text) => {
      debugger;
      setInputText(text);
      filterSuggestions(text);
      setShowSuggestions(true);
    };

    const handleSuggestionPress = (suggestion) => {
      debugger;
      setInputText(suggestion.name);
      setNewCard({...newCard, categoryId: suggestion.id})
      setShowSuggestions(false);
    };

  

  return (
    <View style={styles.container}>
      <div style = {styles.card}>
        <Text style={styles.categoryName}>{categoryName}</Text>
        {nextCard && 
         <>
            <div><Text style={styles.cardText}>{nextCard.question}</Text></div>
            {(showAnswer === true) ?
            <>
              <hr className="rounded"></hr>
              <div><Text style={styles.cardText}>{nextCard.answer}</Text></div>
              <Pressable title="Next" style = {styles.myButton} onPress = {getNextCard}>
                <Text style={styles.text}>{"Next"}</Text>
              </Pressable>
            </>
            : <Pressable title="Check" style = {styles.myButton} onPress={checkAnswer}>
                <Text style={styles.text}>{"Check"}</Text>
              </Pressable>}
         </>
        }
      </div>
      <div style = {styles.card}>
        {/* <TextInput
          placeholder="Dodaj kategorię"
          value={newCategory.name}
          onChangeText={text => setNewCategory({name: text })}
        /> */}
        {/* <Button title="Dodaj" onPress={createCategory}/> */}

        <TextInput
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            marginBottom: 10,
          }}
          placeholder="Kategoria"
          value={inputText}
          onChangeText={handleInputChange}
        />
        {showSuggestions && (suggestions.length > 0) && (
          <FlatList
              data={suggestions}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
                  <Text style={{ padding: 5 }}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                maxHeight: 100,
              }}
            />
        )}

        {/* <Picker
          selectedValue={selectedCatValue}
          onValueChange={(itemValue) => {
            setSelectedCatValue(itemValue);
            setNewCard({...newCard, categoryId: itemValue})}
          } 
        >
          {categories.map((cat) => (
            <Picker.Item key={cat.id} value={cat.id} label={cat.name} />
          ))}
        </Picker> */}

        <TextInput
          style = {styles.inputText}
          placeholder="Pytanie"
          value={newCard.question}
          onChangeText={text => setNewCard({ ...newCard, question: text })}
        />
        <hr className="rounded"></hr>
        <TextInput
          style = {styles.inputText}
          placeholder="Odpowiedź"
          value={newCard.answer}
          onChangeText={text => setNewCard({ ...newCard, answer: text })}
        />
        <Pressable style = {styles.myButton} onPress={createCard}>
          <Text style={styles.text}>{"Dodaj"}</Text>
        </Pressable>
        <Pressable title="Edytuj" style = {styles.myButton} onPress={editCard}><Text style={styles.text}>{"Edytuj"}</Text></Pressable>
        <Pressable title="Usuń" style = {styles.myButton} onPress={deleteCard}><Text style={styles.text}>{"Usuń"}</Text></Pressable>
        <StatusBar style="auto" />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFEFF3',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  },
  card: {
    width: 492,
    height: 'auto',
    flexShrink: 0,
    borderRadius: 20,
    border: '1px solid #BFBFBF',
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
    boxShadow: '0 4 4 0 rgba(0, 0, 0, 0.50)',
    margin: 10,
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
  },
  cardText:{
    display: 'flex',
    width: 260,
    height: 115,
    flexDirection: 'column',
    justifyContent: 'center',
    flexShrink: 0,
    color: '#2A2A2A',
    textAlign: 'left',
    fontFamily: 'Inter',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 600,
    margin: 10
  },
  inputText:{
    display: 'flex',
    width: 260,
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    flexShrink: 0,
    color: '#BFBFBF',
    textAlign: 'left',
    fontFamily: 'Inter',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 600,
    margin: 5
  },
  categoryName: {
    display: 'flex',
    width: 266,
    height: 40,
    flexDirection: 'column',
    justifyContent: 'center',
    flexShrink: 0,
    color: '#2A2A2A',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 30,
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
  },
  rounded: {
    borderTopWidth: 8,
    borderTopColor: '#bbb',
    borderRadius: 5,
  },
  myButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    border: '1px solid #E9E9F2',
    margin: 2,
  },
});