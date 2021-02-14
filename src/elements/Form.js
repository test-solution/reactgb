// import { useState } from 'react';
import axios from 'axios';

function Form({ data, funct }) {

    // https://habr.com/ru/post/507572/ Как управлять состоянием React приложения без сторонних библиотек
    // https://www.codecademy.com/courses/react-101/lessons/the-state-hook/exercises/objects-in-state
    // console.log(data);
    // console.log(funct);

    function HandleImageUpload() {
        const imageLoader = document.getElementById('image_loader');
        imageLoader.addEventListener('change', handleImage, false);
        imageLoader.click();

        function handleImage(e) {
            const target = imageLoader.files[0];
            const type = target.type.split('/');
            const typeArr = ['jpg', 'jpeg', 'gif', 'png'];

            if (!typeArr.includes(type[1])) {
                funct.setButtonValue('Недопустимый формат');
                return;
            } else {
                // setButtonIsDisabled(true);
                funct.setButtonValue('Изображение загружено');
            }

            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);

            reader.onload = function (event) {
                const image = new Image();
                image.src = event.target.result;

                image.onload = function () {
                    let imgWidth = image.width;
                    let imgHeight = image.height;
                    const orientation = imgWidth / imgHeight;

                    if (imgHeight > 240 || imgWidth > 320) {
                        if (orientation <= 1 || imgHeight * (320 / imgWidth) > 240) {
                            imgWidth = imgWidth * (240 / imgHeight);
                            imgHeight = 240;
                        } else {
                            imgHeight = imgHeight * (320 / imgWidth);
                            imgWidth = 320;
                        }
                    }

                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = imgWidth;
                    canvas.height = imgHeight;
                    ctx.drawImage(image, 0, 0, imgWidth, imgHeight);

                    const preview = new Image(imgWidth, imgHeight);
                    preview.src = canvas.toDataURL('image/jpeg', 1.0);
                    // setStates(preview.src);

                    // console.log(preview.src);

                    funct.setImage(preview.src);
                };
            };
        }
    }

    function handleNameValidation(e) {
        if (e.target.value.match(/[^0-9A-Z a-z]/gi)) {
            e.target.value = e.target.value.replace(/[^0-9A-Z a-z]/gi, '');
        }
    }

    function handleEmailOnInput(e) {
        e.target.value = e.target.value.toLowerCase();
        if (e.target.value.match(/[^@0-9a-z-\.]/gi)) {
            e.target.value = e.target.value.replace(/[^@0-9a-z-\.]/gi, '');
        }
        resetErrorValue();
    }

    function resetErrorValue() {
        document.getElementById('error').innerHTML = '';
    }

    function handleEmailOnBlurValidation(e) {
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/;

        if (!e.target.value.match(reg) && e.target.value != '') {
            document.getElementById('error').innerHTML = 'Ошибка! Введите правильный email.';
            e.target.classList.add('invalid');
            return false;
        }

        async function __checkingMailOriginality(event) {
            // const user = {
            //     name: 12
            // };

            axios.post(`/check`, {})
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
        }

        async function checkingMailOriginality(event) {
            const data = document.getElementById('email').value;
            if (data == '') return false;
            const path = '/check';

            const response = await fetch(path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(data),
            });

            const result = await response.text();
            console.log(result);

            if (result != 0) {
                document.getElementById('error').innerHTML =
                    'Вы уже комментировали. Допустим только один отзыв!';
            } else {
                funct.setMail(data);
            }
        }
        checkingMailOriginality();
    }

    function handleHomePageValidation(e) {
        e.target.value = e.target.value.toLowerCase().replace('https://', '').replace('http://', '');
    }


    async function handleFeedbackSend(e) {
        e.preventDefault();
        const error = document.getElementById('error').innerHTML;

        // const name = document.getElementById('userName').value;
        // const email = document.getElementById('email').value;
        // const homepage = document.getElementById('homepage').value;
        // const feedback = document.getElementById('feedback').value;
        // const img = data.image;

        if (!data.name || !data.mail || !data.feedback || error) {
            return;
        }

        // переписать, взять значения из состояний

        const feedbackData = {
            name: data.name,
            mail: data.mail,
            page: data.homePage,
            feedback: data.feedback,
            image: data.image,
        };

        const path = '/add';

        const response = await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(feedbackData),
        });

        const result = await response.text();
        document.location.href = '/';
    }


    return (
        <div className="feedbackForm">
            <form id="dialog" onSubmit={handleFeedbackSend} >
                
                <h2>Мой комментарий:</h2>

                <i id="closeForm" className="material-icons closeForm"
                    onClick={() => funct.showComponent('startButton')} >clear</i>

                <div id="error" className="error"></div>

                <span className="formContainer">
                    <label>Имя (на английском):<input name="name" id="userName"
                        type="text" maxLength="40" required placeholder="e.g. Piter"
                        defaultValue={data.name}
                        onInput={handleNameValidation}
                        onBlur={e => funct.setName(e.target.value)} />
                    </label>

                    <label>E-mail:<input name="mail" id="email" type="text" required
                        maxLength="40" placeholder="mail@example.com"
                        defaultValue={data.mail}
                        onInput={handleEmailOnInput}
                        onBlur={handleEmailOnBlurValidation} />
                    </label>

                    <label>Моя домашняя страница:<input id="homepage" name="page"
                        type="text" maxLength="100" placeholder="example.com"
                        defaultValue={data.homePage}
                        onInput={handleHomePageValidation}
                        onBlur={e => funct.setHomePage(e.target.value)} />
                    </label>
                </span>

                <label>Текст комментария:<textarea className="textareaForm"
                    id="feedbackText" maxLength="800" required
                    defaultValue={data.feedback}
                    onBlur={e => funct.setFeedback(e.target.value)} ></textarea>
                </label>

                <span className="formContainer">
                    <input id="image_loader" type="file" hidden />

                    <input id="upload" type="button" className="buttonSubmit"
                        defaultValue={data.buttonValue}
                        onClick={HandleImageUpload} />

                    <input id="view_preview" type="button" className="buttonSubmit"
                        defaultValue="Предварительный просмотр"
                        onClick={() => funct.showComponent('preview')} />

                    <input id="feedback_send" type="submit" className="buttonSubmit"
                        defaultValue="Опубликовать" />
                </span>
            </form>
        </div >
    );
}

export default Form;