import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Input } from "../components/Input";
import { themas } from "../global/themes";
import { Flag } from "../components/Flag";
import CustomDateTimePicker from "../components/CustomDateTime";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContextList: any = createContext({});

const flags = [
  {
    caption: "urgente",
    color: themas.colors.red,
  },
  {
    caption: "opcional",
    color: themas.colors.blueLigth,
  },
];

export const AuthProviderList = (props: any): any => {
  const modalizeRef = useRef<Modalize>(null);

  const [item, setItem] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFlag, setSelectedFlag] = useState("urgente");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [taskList, setTaskList] = useState([]);

  const onOpen = () => {
    modalizeRef?.current?.open();
  };

  const onClose = () => {
    modalizeRef?.current?.close();
  };

  useEffect(() => {
    get_taskList();
  }, []);

  const _renderFlags = () => {
    return flags.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setSelectedFlag(item.caption);
        }}
      >
        <Flag
          caption={item.caption}
          color={item.color}
          selected={item.caption == selectedFlag}
        />
      </TouchableOpacity>
    ));
  };

  const handleDateChange = (date: React.SetStateAction<Date>) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (date: React.SetStateAction<Date>) => {
    setSelectedTime(date);
  };

  const handleSave = async () => {
    // await AsyncStorage.removeItem("taskList");
    if (!title || !description || !selectedFlag) {
      return Alert.alert(`Atenção, Preencha os campos corretamente.`);
    }
    try {
      const newItem = {
        item: item !== 0 ? item : Date.now(),
        title: title,
        description: description,
        flag: selectedFlag,
        timeLimit: new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          selectedDate.getHours(),
          selectedDate.getMinutes()
        ).toISOString(),
      };
      const storageData = await AsyncStorage.getItem("taskList");
      // console.log(storageData);
      let taskList: Array<any> = storageData ? JSON.parse(storageData) : [];
      const itemIndex = taskList.findIndex(
        (task) => task.item === newItem.item
      );

      if (itemIndex >= 0) {
        taskList[itemIndex] = newItem;
      } else {
        taskList.push(newItem);
      }

      await AsyncStorage.setItem("taskList", JSON.stringify(taskList));

      setTaskList(taskList);
      setData();
      onClose();
    } catch (error) {
      console.log(`Erro ao salvar o item: ${error}`);
    }
  };

  const setData = () => {
    setTitle("");
    setDescription("");
    setSelectedFlag("urgente");
    setItem(0);
    setSelectedDate(new Date());
    setSelectedTime(new Date());
  };

  async function get_taskList() {
    try {
      const storageData = await AsyncStorage.getItem("taskList");
      const taskList = storageData ? JSON.parse(storageData) : [];
      setTaskList(taskList);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (itemToDelete) => {
    try {
      const storageData = await AsyncStorage.getItem("taskList");
      const taskList: Array<any> = storageData ? JSON.parse(storageData) : [];
      const updateTaskList = taskList.filter(
        (item) => item.item !== itemToDelete.item
      );

      await AsyncStorage.setItem("taskList", JSON.stringify(updateTaskList));
      setTaskList(updateTaskList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (itemToEdit: PropCard) => {
    try {
      setTitle(itemToEdit.title);
      setDescription(itemToEdit.description);
      setItem(itemToEdit.item);
      setSelectedFlag(itemToEdit.flag);

      const timeLimit = new Date(itemToEdit.timeLimit);
      setSelectedDate(timeLimit);
      setSelectedTime(timeLimit);

      onOpen();
    } catch (error) {}
  };

  const _container = () => {
    return (
      <KeyboardAvoidingView
        style={style.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={style.header}>
          <TouchableOpacity onPress={() => onClose()}>
            <MaterialIcons name="close" size={30} />
          </TouchableOpacity>

          <Text style={style.title}>Criar Tarefa</Text>

          <TouchableOpacity onPress={() => handleSave()}>
            <AntDesign name="check" size={30} />
          </TouchableOpacity>
        </View>

        <View style={style.content}>
          <Input
            title="Título"
            labelStyle={style.label}
            value={title}
            onChangeText={setTitle}
          />
          <Input
            title="Descrição"
            labelStyle={style.label}
            heigth={100}
            multiline={true}
            numberOfLines={5}
            value={description}
            onChangeText={setDescription}
            textAlignVertical="top"
          />

          <View style={{ width: "40%" }}>
            <View style={{ flexDirection: "row", gap: 10, width: "100%" }}>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={{ width: 200 }}
              >
                <Input
                  title="Data Limite"
                  labelStyle={style.label}
                  editable={false}
                  value={selectedDate.toLocaleDateString()}
                  onPress={() => setShowDatePicker(true)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowTimePicker(true)}
                style={{ width: 130 }}
              >
                <Input
                  title="Hora Limite"
                  labelStyle={style.label}
                  editable={false}
                  value={selectedTime.toLocaleTimeString()}
                  onPress={() => setShowTimePicker(true)}
                />
              </TouchableOpacity>
            </View>

            <CustomDateTimePicker
              onDateChange={handleDateChange}
              setShow={setShowDatePicker}
              show={showDatePicker}
              type={"date"}
            />

            <CustomDateTimePicker
              onDateChange={handleTimeChange}
              setShow={setShowTimePicker}
              show={showTimePicker}
              type={"time"}
            />
          </View>

          <View style={style.containerFlag}>
            <Text style={[style.label, { textTransform: "uppercase" }]}>
              Flags:
            </Text>
            <View style={style.rowFlags}>{_renderFlags()}</View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  };

  return (
    <AuthContextList.Provider
      value={{ onOpen, taskList, handleDelete, handleEdit }}
    >
      {props.children}
      <Modalize
        ref={modalizeRef}
        childrenStyle={{ height: 525 }}
        adjustToContentHeight={true}
      >
        {_container()}
      </Modalize>
    </AuthContextList.Provider>
  );
};

export const userAuth = () => useContext(AuthContextList);

export const style = StyleSheet.create({
  container: {
    width: "100%",
  },

  header: {
    width: "100%",
    height: 40,
    paddingHorizontal: 40,
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  content: {
    width: "100%",
    paddingHorizontal: 20,
  },

  containerFlag: {
    width: "100%",
    padding: 10,
  },

  label: {
    fontWeight: "bold",
    color: "#000",
  },

  rowFlags: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
});
