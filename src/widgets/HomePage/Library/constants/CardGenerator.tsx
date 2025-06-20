"use client";
import React, { useState, useEffect } from "react";
import { CSSBoundingContainer } from "@/src/shared/styles";
import { useTranslations } from "next-intl";
import {
  CSSButton,
  CSSInput,
  CSSText,
  CSSHEXColor,
  CSSRemainingTime,
  CSSLinia,
  CSSCardLocation,
  CSSCards,
} from "./styles";
import { Flex } from "antd";
import { generateColor } from "@/src/shared/library/helper/color-random";
import { getRandomCountdown } from "@/src/shared/library/helper/time-random";

interface Card {
  id: string;
  bgColor: string;
  countdown: number;
  createdAt: number;
}

export const CardGenerator = () => {
  const tCardGenerator = useTranslations("home-page");

  // Состояния компонента
  const [count, setCount] = useState<number>(1);
  const [intervalTime, setIntervalTime] = useState<number>(2);
  const [cards, setCards] = useState<Card[]>([]);
  const [isActive, setIsActive] = useState<boolean>(false);

  // Генерация случайного цвета
  {
    generateColor;
  }

  // Генерация случайного времени жизни (2-10 секунд)
  {
    getRandomCountdown;
  }

  // Создание новых карточек
  const generateNewCards = () => {
    const newCards = Array.from({ length: count }, () => ({
      id: Math.random().toString(36).substring(2, 9),
      bgColor: generateColor(),
      countdown: getRandomCountdown(),
      createdAt: Date.now(),
    }));
    setCards((prev) => [...prev, ...newCards]);
  };

  // Удаление карточек с истекшим временем
  const removeExpiredCards = () => {
    const now = Date.now();
    setCards((prev) =>
      prev.filter((card) => (now - card.createdAt) / 1000 < card.countdown)
    );
  };

  // Обновление таймера
  const CardClick = (id: string) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id
          ? { ...card, countdown: getRandomCountdown(), createdAt: Date.now() }
          : card
      )
    );
  };

  // Запуск/остановка генерации
  const toggleGeneration = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      setCards([]);
      generateNewCards();
      setIsActive(true);
    }
  };

  // Для интервальной генерации
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      generateNewCards();
    }, intervalTime * 1000);

    return () => clearInterval(interval);
  }, [isActive, count, intervalTime]);

  // Для проверки времени жизни карточек
  useEffect(() => {
    const checkInterval = setInterval(() => {
      removeExpiredCards();
    }, 100);

    return () => clearInterval(checkInterval);
  }, []);

  return (
    <CSSBoundingContainer>
      <CSSText>
        {tCardGenerator("inputCount")}:
        <CSSInput
          type="number"
          step="1"
          min="1"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          disabled={isActive}
        />
        {tCardGenerator("inputInterval")}:
        <CSSInput
          type="number"
          step="1"
          min="1"
          value={intervalTime}
          onChange={(e) => setIntervalTime(Number(e.target.value))}
          disabled={isActive}
        />
      </CSSText>

      <Flex style={{ alignItems: "center", justifyContent: "center" }}>
        <CSSButton onClick={toggleGeneration}>
          {isActive ? tCardGenerator("Stop") : tCardGenerator("Start")}
        </CSSButton>
      </Flex>

      <CSSCardLocation>
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={() => CardClick(card.id)} />
        ))}
      </CSSCardLocation>
    </CSSBoundingContainer>
  );
};

// Отедльная карточка
const Card = ({ card, onClick }: { card: Card; onClick: () => void }) => {
  const [remainingTime, setRemainingTime] = useState(card.countdown);

  // Обновление времени
  useEffect(() => {
    const timer = setInterval(() => {
      const elapsed = (Date.now() - card.createdAt) / 1000;
      setRemainingTime(Math.max(0, card.countdown - elapsed));
    }, 100);

    return () => clearInterval(timer);
  }, [card]);

  const progress = (remainingTime / card.countdown) * 100;

  return (
    <CSSCards
      onClick={onClick}
      style={{
        backgroundColor: card.bgColor,
      }}
    >
      <CSSHEXColor>{card.bgColor}</CSSHEXColor>
      <div>
        <CSSRemainingTime>{remainingTime.toFixed(1)}s</CSSRemainingTime>
        <CSSLinia>
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#fff",
              transition: "width 0.1s linear",
            }}
          />
        </CSSLinia>
      </div>
    </CSSCards>
  );
};
