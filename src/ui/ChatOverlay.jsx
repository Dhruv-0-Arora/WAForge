import React, { useState, useEffect } from "react";
import AIHandler from "../util/AIHandler";

export default function ChatOverlay() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [showOld, setShowOld] = useState(true);

    const [message, setMessage] = useState("");

    // Store chat messages in state with an initial AI greeting.
    const [chatMessages, setChatMessages] = useState([
        { type: "green", text: "Hello! How can I help you today?" },
    ]);

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && message.trim() !== "") {
            const userMessage = message.trim();

            // Add the user's message (white bubble)
            setChatMessages((prevMessages) => [
                ...prevMessages,
                { type: "white", text: userMessage },
            ]);

            setMessage(""); // Clear input after sending

            // Get AI response and add it as a green bubble
            const aiHandler = AIHandler.GetInstance();
            aiHandler
                .GenerateText(
                    "You are a ChatBOT for the Company ENVORA. Your job as the chatbot is to respond to customer inquiries regarding travel sustainability. The user message is as follows: " +
                        userMessage,
                )
                .then((response) => {
                    setChatMessages((prevMessages) => [
                        ...prevMessages,
                        { type: "green", text: response },
                    ]);
                })
                .catch((error) => {
                    console.error("AI generation error:", error);
                });
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setTimeout(() => {
                setShowOld(false);
            }, 750);
        }, 1500);
    }, []);

    return (
        <div>
            {!showOld && (
                <div>
                    {/* Fixed Chat Button: White circle with chat icon */}
                    <button
                        className="fixed bottom-4 right-4 z-50 bg-white p-4 rounded-full shadow-lg hover:bg-gray-100 flex items-center justify-center"
                        onClick={() => setIsChatOpen(true)}
                    >
                        {/* Inline SVG chat icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-[10vh] h-[10vh] text-[#4771AF]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-9-9 9 9 0 019 9z"
                            />
                        </svg>
                    </button>

                    {/* Chat Window */}
                    {isChatOpen && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            {/* Chat Box (gray background, no overlay behind it) */}
                            <div className="relative w-full max-w-md h-[20vh] bg-gray-200 rounded-xl shadow-lg">
                                {/* Close Button in top-right */}
                                <button
                                    onClick={() => setIsChatOpen(false)}
                                    className="absolute top-0 right-2 text-black text-2xl"
                                >
                                    &times;
                                </button>

                                {/* Main Chat Layout */}
                                <div className="flex flex-col h-full">
                                    {/* Title */}
                                    <div className="text-center p-2 text-black font-bold text-lg">
                                        CHAT
                                    </div>

                                    {/* Scrollable messages area */}
                                    <div className="flex flex-col overflow-y-auto px-4 pb-2 space-y-2">
                                        {chatMessages.map((msg, index) => {
                                            // For green messages, anchor left; for white, anchor right
                                            const bubbleClasses =
                                                msg.type === "green"
                                                    ? "bg-[#3CCB40] text-white px-4 py-2 rounded-md mb-2 w-[80%] self-start"
                                                    : "bg-white text-black px-4 py-2 rounded-md mb-2 w-[80%] self-end ml-auto text-right";

                                            return (
                                                <div
                                                    key={index}
                                                    className={bubbleClasses}
                                                >
                                                    {msg.text}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Input bubble pinned at bottom */}
                                    <div className="p-4 mb-2 flex justify-center">
                                        <div className="bg-white rounded-full px-4 py-2 shadow-md w-[80%]">
                                            <input
                                                type="text"
                                                className="bg-transparent outline-none text-sm p-2 w-full"
                                                placeholder="Type here"
                                                value={message}
                                                onChange={(e) =>
                                                    setMessage(e.target.value)
                                                }
                                                onKeyDown={handleKeyPress} // Detects Enter key
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
