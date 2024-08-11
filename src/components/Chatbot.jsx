import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import questions from './Questions.json';

const initialResults = { IT: 0, Research: 0, HigherStudies: 0, Others: 0 };

const Chatbot = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [results, setResults] = useState(initialResults);
    const [completed, setCompleted] = useState(false);

    const handleAnswer = (option) => {
        const weights = questions[currentQuestion].weights;
        const optionIndex = questions[currentQuestion].options.indexOf(option);
        const newResults = { ...results };

        for (let path in weights) {
            newResults[path] += weights[path][optionIndex];
        }

        setResults(newResults);
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setCompleted(true);
        }
    };

    const data = [
        { subject: 'IT', A: results.IT, fullMark: 100 },
        { subject: 'Research', A: results.Research, fullMark: 100 },
        { subject: 'HigherStudies', A: results.HigherStudies, fullMark: 100 },
        { subject: 'Others', A: results.Others, fullMark: 100 },
    ];

    return (
        <div
            className="min-h-screen flex justify-center items-center relative"
            style={{
                backgroundImage: 'url(/sp1.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                width: '100vw',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                fontFamily: "'Press Start 2P', cursive",
            }}
        >
            {/* Rocket Animation - Hidden on Mobile */}
            <div className="relative z-10 w-2/3 flex justify-center items-center rocket">
                <motion.img
                    src="/rocket.gif"
                    alt="Rocket Animation"
                    animate={{ y: [0, -50, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: '80%', height: 'auto' }}
                />
            </div>

            {!completed ? (
                <div
                    className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center question-container"
                    style={{
                        border: '4px solid black',
                        background: 'rgba(255, 255, 255, 0.9)',
                        textAlign: 'left',
                        fontSize: '18px',
                        borderRadius: '10px',
                        margin: '0 auto',
                        position: 'relative',
                    }}
                >
                    {/* Question Counter - Hidden on Mobile */}
                    <div
                        className="question-counter"
                        style={{
                            position: 'absolute',
                            top: '1px',
                            right: '500px',
                            background: 'white',
                            color: 'black',
                            padding: '5px 20px',
                            borderRadius: '5px',
                            fontSize: '16px',
                            fontFamily: 'inherit',
                        }}
                    >
                        Question {currentQuestion + 1}/{questions.length}
                    </div>

                    <h2 className="text-xl font-bold mb-4 question-text">{questions[currentQuestion].question}</h2>
                    <div className="question-buttons">
                        {questions[currentQuestion].options.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleAnswer(option)}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full mb-2"
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    margin: '10px 0',
                                    fontSize: '16px',
                                    fontFamily: 'inherit',
                                    cursor: 'pointer',
                                    transition: 'background 0.3s ease-in-out',
                                }}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center result-container" style={{
                    border: '4px solid black',
                    background: 'rgba(255, 255, 255, 0.9)',
                    padding: '20px',
                    textAlign: 'left',
                    fontSize: '12px',
                    borderRadius: '10px',
                    marginRight: '80px',
                }}>
                    <h2 className="text-xl font-bold mb-4">Career Path Recommendation</h2>
                    <p className="mb-4">Based on your responses, the recommended career paths for you:</p>
                    <div className="flex justify-center radar-chart">
                        <RadarChart cx={200} cy={200} outerRadius={150} width={400} height={400} data={data}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis />
                            <Radar
                                name="Career Path"
                                dataKey="A"
                                stroke="#8884d8"
                                fill="#8884d8"
                                fillOpacity={0.6}
                            />
                            <Tooltip />
                        </RadarChart>
                    </div>
                    <p className="mt-4">Thank you for using our career path recommendation chatbot!</p>
                </div>
            )}
            <style>
                {`
                    @media (max-width: 768px) {
                        .rocket {
                            display: none;
                        }
                        .question-counter {
                            display: none;
                        }
                        .question-container, .result-container {
                            margin: 0 auto;
                            width: 100%;
                            max-width: 100%;
                            padding: 10px;
                        }
                        .question-text {
                            font-size: 14px;
                        }
                        .question-buttons button {
                            font-size: 14px;
                            padding: 8px 16px;
                        }
                        .radar-chart {
                            width: 100%;
                            max-width: 300px;
                            height: auto;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default Chatbot;
