import React, { createContext, useContext, useState } from 'react';
import colorData from "../color-data.json";
import { v4 } from "uuid" // пакет для генерации уникальных id-шников

export const ColorContext = createContext(); // создаем контекст для простого использования сстояния из любого места приложения

export const useColors = () => useContext(ColorContext) // создаем свой хук для читаемости







export default function ColorProvider({ children }) {
    const [colors, setColors] = useState(colorData)


    const createColor = (title, color) => { // вызывая onNewColor мы сохраняем новый цвет в состояние (мы их передали из дочернего компонента)
        const newColors = [  // создаем новый массив цветов

            {
                id: v4(),    // создаем новый объект цвета с уникальным id
                rating: 0,   // по умолчанию рейтинг-0 
                title,       // новый title и color
                color
            },
            ...colors       // берем все старые цвета,
        ];
        setColors(newColors); // изменяем состояние добавляя обновленный массив с цветами
    }


    // изменение рейтинга
    const rateColor = (id, rating) => {
        const newColors = colors.map(color =>
            color.id === id ? { ...color, rating } : color) // берем цвет, рейтинг которого был изменет, через map обновляем значение rating
        // в этом цвете, и обновляем состояние через setColors
        setColors(newColors)
    }



    //  удаление цвета
    const removeColor = id => {
        const newColors = colors.filter(color => color.id !== id)
        setColors(newColors)
    }
    return (
        <ColorContext.Provider value={{ colors, createColor, rateColor, removeColor }}>
            {children}
        </ColorContext.Provider>
    );
};