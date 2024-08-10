import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import questions from './Questions.json'; // Ensure this path is correct

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
        { name: 'IT', value: results.IT },
        { name: 'Research', value: results.Research },
        { name: 'HigherStudies', value: results.HigherStudies },
        { name: 'Others', value: results.Others },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div
            className="min-h-screen flex justify-between items-center relative"
            style={{
                backgroundImage: 'url(/sp1.png)', // Ensure the correct path to your background image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',  // Ensure full viewport height
                width: '100vw',   // Ensure full viewport width
                backgroundRepeat: 'no-repeat',  // Prevents the background from repeating
                position: 'relative',
                fontFamily: "'Press Start 2P', cursive", // Retro font
            }}
        >
            {/* Rocket Animation */}
            <div className="relative z-10 w-2/3 flex justify-center items-center">
                <motion.img
                    src="/rocket.gif"
                    alt="Rocket Animation"
                    className="rocket"
                    animate={{ y: [0, -50, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: '80%', height: 'auto' }}
                />
            </div>

            {!completed ? (
                <div
                    className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center"
                    style={{
                        border: '4px solid black',
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '20px',
                        textAlign: 'left',
                        fontSize: '18px',
                        borderRadius: '10px',
                        marginRight: '80px', // Add space from the right edge
                        position: 'relative',
                    }}
                >
                    {/* Question Counter */}
                    <div
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

                    <h2 className="text-xl font-bold mb-4">{questions[currentQuestion].question}</h2>
                    <div>
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
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center" style={{
                    border: '4px solid black',
                    background: 'rgba(255, 255, 255, 0.9)',
                    padding: '20px',
                    textAlign: 'left',
                    fontSize: '18px',
                    borderRadius: '10px',
                    marginRight: '80px', // Add space from the right edge
                }}>
                    <h2 className="text-xl font-bold mb-4">Career Path Recommendation</h2>
                    <p className="mb-4">Based on your responses, we recommend the following career paths for you:</p>
                    <div className="flex justify-center">
                        <PieChart width={300} height={300}>
                            <Pie
                                data={data}
                                cx={150}
                                cy={150}
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>
                    <p className="mt-4">Thank you for using our career path recommendation chatbot!</p>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
