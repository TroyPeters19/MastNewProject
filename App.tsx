
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView} from 'react-native';

type MenuItem = {
  id: number;
  name: string;
  description: string;
  course: string;
  price: string;
};

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');
  const [Course, setCourse] = useState('Main Course');
  const [Price, setPrice] = useState('');

  const [showForm, setShowForm] = useState(false);

  function saveMenuItem() {
    if (
      Name.trim() === '' ||
      Description.trim() === '' ||
      Price.trim() === ''
    ) {
      alert('Please complete all fields.');
      return;
    }

    if (!Number.isFinite(Number(Price)) || Number(Price) <= 0) {
      alert('Please enter a valid price.');
      return;
    }

    const newItem: MenuItem = {
      id: Date.now(),
      name: Name,
      description: Description,
      course: Course,
      price: Number(Price).toFixed(2)
    };

    setMenuItems([...menuItems, newItem]);

    setName('');
    setDescription('');
    setCourse('Main Course');
    setPrice('');
    setShowForm(false);

    alert('Menu item saved successfully.');
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {showForm ? (
        <AddMenuItem
          Name={Name}
          setName={setName}
          Description={Description}
          setDescription={setDescription}
          Course={Course}
          setCourse={setCourse}
          Price={Price}
          setPrice={setPrice}
          saveMenuItem={saveMenuItem}
          goBack={() => setShowForm(false)}
        />
      ) : (
        <MainScreen
          menuItems={menuItems}
          openForm={() => setShowForm(true)}
        />
      )}
    </View>
  );
}

function MainScreen({
  menuItems,
  openForm
}: {
  menuItems: MenuItem[];
  openForm: () => void;
}) {
  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Chef Menu Manager</Text>
      <Text style={styles.subheading}>Menu Items</Text>

      <Button title="Add Menu Item" onPress={openForm} />

      <ScrollView style={styles.list}>
        {menuItems.length === 0 ? (
          <Text style={styles.emptyText}>
            No menu items added yet.
          </Text>
        ) : (
          menuItems.map((item) => (
            <View key={item.id} style={styles.menuCard}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>Course: {item.course}</Text>
              <Text style={styles.price}>Price: R{item.price}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

function AddMenuItem({
  Name,
  setName,
  Description,
  setDescription,
  Course,
  setCourse,
  Price,
  setPrice,
  saveMenuItem,
  goBack
}: {
  Name: string;
  setName: (value: string) => void;
  Description: string;
  setDescription: (value: string) => void;
  Course: string;
  setCourse: (value: string) => void;
  Price: string;
  setPrice: (value: string) => void;
  saveMenuItem: () => void;
  goBack: () => void;
}) {
  return (
    <ScrollView
      style={styles.screen}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>Add Menu Item</Text>

      <Text style={styles.label}>Dish Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter dish name"
        value={Name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Enter description"
        value={Description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Course:</Text>

      {['Starter', 'Main Course', 'Dessert'].map((option) => (
        <Text
          key={option}
          style={[
            styles.courseOption,
            Course === option && styles.selectedCourse
          ]}
          onPress={() => setCourse(option)}
        >
          {Course === option ? '● ' : '○ '}
          {option}
        </Text>
      ))}

      <Text style={styles.label}>Price (R):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        value={Price}
        onChangeText={setPrice}
        keyboardType="decimal-pad"
      />

      <View style={styles.buttonSpace}>
        <Button title="Save Menu Item" onPress={saveMenuItem} />
      </View>

      <Button title="Cancel" onPress={goBack} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  screen: {
    flex: 1,
    padding: 20
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#234E70',
    marginBottom: 15
  },
  subheading: {
    fontSize: 19,
    marginBottom: 15
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 6
  },
  input: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    borderRadius: 5,
    padding: 10,
    fontSize: 16
  },
  descriptionInput: {
    height: 90,
    textAlignVertical: 'top'
  },
  list: {
    marginTop: 15
  },
  menuCard: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 6,
    marginBottom: 12,
    backgroundColor: '#F8FAFC'
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#234E70',
    marginBottom: 5
  },
  price: {
    fontWeight: 'bold',
    marginTop: 5
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16
  },
  courseOption: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginBottom: 8
  },
  selectedCourse: {
    backgroundColor: '#DCEAF5',
    borderColor: '#234E70'
  },
  buttonSpace: {
    marginTop: 20,
    marginBottom: 12
  }
});