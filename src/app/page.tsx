"use client";
import Button from "@/components/Button";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Question {
  id: number;
  materia: string;
  pergunta: string;
  respostas: string[];
  respostaCorreta: string;
  fundamento?: string | undefined;
}

interface Disciplinas {
  [edd: string]: string | undefined;
  fpc: string;
  sc: string;
}

const disciplinas: Disciplinas = {
  edd: "Estrutura de dados",
  fpc: "Formação profssional em computação",
  sc: "Sistemas computacionais",
};

export default function Home() {
  const [theme, setTheme] = useState<string>("empty");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [points, setPoints] = useState<number>(0);
  const [round, setRound] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [isRight, setIsRight] = useState<boolean>(false);
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const length = shuffledQuestions.length;

  useEffect(() => {
    async function load() {
      setLoading(true);
      const questions = await fetch(
        "https://65023949736d26322f5ce1f6.mockapi.io/questions"
      );
      const data = await questions.json();
      setQuestions(data);
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    if (theme === "empty") return;
    else {
      const filtered = questions.filter((item) => item.materia === theme);
      const shuffled = filtered.sort(() => 0.5 - Math.random());
      setShuffledQuestions(shuffled);
    }
  }, [theme, questions]);

  return (
    <main className="max-w-lg mx-1 sm:mx-auto [&_div]:border-gray-500">
      <header className="border rounded-md p-1 flex justify-between border-gray-500">
        <p className="text-2xl font-extrabold">Quiz</p>
        <p className="text-2xl font-extrabold">Pontos: {points}</p>
      </header>
      <section className="mt-2">
        <div className="border rounded-md p-1">
          {loading ? (
            <p>Carregando perguntas...</p>
          ) : (
            <p className="text-xl font-extrabold">
              {" "}
              {theme == "empty"
                ? "Bem vindo ao Quiz, escolha a disciplina que quer jogar."
                : `${disciplinas[theme]} - Faltam  ${length} perguntas`}
            </p>
          )}
        </div>
        {theme === "empty" && (
          <div id="themeSelector" className="my-1 border rounded-md p-1">
            <Button
              onClick={() => setTheme("edd")}
              key={"edd"}
              color="attention"
              title="Estrutura de dados"
            />

            <Button
              aria-label="Formação profssional em computação"
              key={"fpc"}
              onClick={() => setTheme("fpc")}
              color="primary"
              title="Formação profssional em computação"
            />
            {/* <Button
              key={"sc"}
              onClick={() => setTheme("sc")}
              color="tertiary"
              title="Sistemas computacionais"
            /> */}
          </div>
        )}
      </section>
      <section id="game-box">
        {shuffledQuestions.length > 0 && !isRight && !isWrong && (
          <div className="border rounded-md p-1 mt-2">
            <p className="sm:text-xl font-bold ">
              {shuffledQuestions[0].pergunta}
            </p>
            <div className="my-1 border rounded-md p-1">
              {shuffledQuestions[0].respostas.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    if (item === shuffledQuestions[0].respostaCorreta) {
                      setIsRight(true);
                      setPoints(points + 1);
                      setRound(round + 1);
                    } else {
                      setIsWrong(true);
                      setRound(round + 1);
                    }
                  }}
                  color="basic"
                  title={item}
                />
              ))}
            </div>
          </div>
        )}
        {isRight && (
          <div className="flex flex-col items-center">
            <p className="sm:text-xl font-bold">Resposta certa!</p>

            <Button
              title="OK"
              color="primary"
              onClick={() => {
                setIsRight(false);
                const newQuestions = shuffledQuestions.slice(1);
                setShuffledQuestions(newQuestions);
              }}
            ></Button>
          </div>
        )}
        {isWrong && (
          <div className="flex flex-col items-center">
            <p className="sm:text-xl font-bold">Você errou</p>
            {/* {shuffledQuestions[0].fundamento && (
              <div className="border rounded-md p-1">
                <p className="sm:text-xl font-bold ">
                  {shuffledQuestions[0].fundamento}
                </p>
              </div>
            )} */}
            <Button
              title="Responder novamente"
              color="tertiary"
              onClick={() => setIsWrong(false)}
            ></Button>
            <Button
              title="OK"
              color="attention"
              onClick={() => {
                setIsWrong(false);
                const newQuestions = shuffledQuestions.slice(1);
                setShuffledQuestions(newQuestions);
              }}
            ></Button>
          </div>
        )}
      </section>
    </main>
  );
}
