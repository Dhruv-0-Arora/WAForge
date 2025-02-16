import React, { useState, useEffect } from "react";
import "../styling/home.css";
import OpenView from "../ui/OpenView";
import HomeView from "../ui/HomeView";

export default function Home() {
    const [showOld, setShowOld] = useState(true);
    const [fadingOut, setFadingOut] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setFadingOut(true);
            setTimeout(() => {
                setShowOld(false);
            }, 750);
        }, 1500);
    }, []);

    return (
        <div>
            {showOld && (
                <div className={`fade ${fadingOut ? "fade-out" : "fade-in"}`}>
                    <OpenView />
                </div>
            )}
            {!showOld && (
                <div className="fade fade-in">
                    <HomeView />
                </div>
            )}
        </div>
    );
}
