import { useState } from 'react';
import './App.css';
import Form from './elements/Form';
import FeedbackRowPreview from './elements/FeedbackRowPreview';

// import Header from './elements/Header';
// import logo from './logo.svg';


function App() {
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [image, setImage] = useState('');
    const [homePage, setHomePage] = useState('');
    const [feedback, setFeedback] = useState('');
    const [showComponent, setShowComponent] = useState('startButton');
    const [buttonValue, setButtonValue] = useState("Добавить изображение");

    function HandleShowComponent(value) {
        setShowComponent(value);
    }

    function HandleSetName(name) {
        setName(name);
    }

    function HandleSetMail(mail) {
        setMail(mail);
    }

    function HandleSetHomePage(homePage) {
        setHomePage(homePage);
    }

    function HandleSetFeedback(feedback) {
        setFeedback(feedback);
    }

    function HandleSetButtonValue(buttonValue) {
        setButtonValue(buttonValue);
    }

    function HandleSetImage(image) {
        setImage(image);
        // "proxy": "http://reactgb:8000"
    }


    function StartButton() {
        return (showComponent === 'startButton') ?
            <input id="addRow" value="Оставить отзыв" type="submit"
                onClick={() => setShowComponent('form')} /> : null;
    }

    const data = {
        name,
        homePage,
        feedback,
        image,
        mail,
        buttonValue
    }

    const funct = {
        setName: HandleSetName,
        setHomePage: HandleSetHomePage,
        setImage: HandleSetImage,
        setFeedback: HandleSetFeedback,
        setButtonValue: HandleSetButtonValue,
        setMail: HandleSetMail,
        showComponent: HandleShowComponent
    }

    function FeedbackForm() {
        return (showComponent === 'form') ?
            <Form data={data} funct={funct} /> : null;
    }

    function FeedbackPreview() {
        return (showComponent === 'preview') ?
            <FeedbackRowPreview data={data} showComponent={HandleShowComponent} /> : null;
    }

    return (
        <div className="App">
            <h1>Гостевая книга</h1>
            <main>
                <StartButton />
                <ul className="feedbackList">
                    <FeedbackPreview />
                    <FeedbackForm />
                </ul>
            </main>
        </div>
    );
}

export default App;
