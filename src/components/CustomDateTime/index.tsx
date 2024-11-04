import React, { useEffect, useState } from "react";
import {} from "@react-navigation/native";
import { Modal, Platform, View } from "react-native";
import { style } from "./style";
import DateTimePicker from "@react-native-community/datetimepicker";

const CustomDateTimePicker = ({ type, onDateChange, show, setShow }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (onDateChange) {
      onDateChange(date);
    }
  }, [date, onDateChange]);

  const onChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
  };
  return (
    <Modal
      transparent={true}
      visible={show}
      onRequestClose={() => setShow(false)}
    >
      <View style={style.modalOverLayer}>
        <View
          style={[
            style.container,
            Platform.OS == "android" && { backgroundColor: "transparent" },
          ]}
        >
          <DateTimePicker
            value={date}
            mode={type}
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={onChange}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CustomDateTimePicker;
