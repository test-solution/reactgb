Гостевая книга c AJAX верификацией.

Гостевая книга предоставляет возможность пользователям оставлять
сообщения на сайте. Все введенные пользователем данные сохраняются в
БД MySQL. Форма добавления записи имеет следующие поля:

* UserName (цифры и буквы латинского алфавита) – обязательное поле.

* E-mail (формат email) – обязательное поле, с одного е-мейла можно
оставить только одно сообщение, если такой е-мейл уже есть в базе -
отображается текстовое сообщение (проверка реализована без
перезагрузки страницы с использованием AJAX).

* Homepage (формат url) – необязательное поле.

* Text (непосредственно сам текст сообщения, HTML тэги недопустимы) –
обязательное поле.

Визуальное оформление ошибок обязательных полей (подсветка,
фокус, сообщение) посредством JS. Сообщения выводятся в виде таблицы,
с возможностью сортировки по следующим полям: UserName, e-mail, и
дата добавления (как в порядке убывания, так и в обратном). Сообщения
разбиваются на страницы.

Кроме базовой функциональности, добавлены следующие возможности:

* К сообщению пользователь может добавить картинку.

* Изображение должно быть не более 320х240 пикселей, при попытке залить
изображение большего размера, картинка пропорционально уменьшается
до заданных размеров, допустимые форматы файлов: JPG, JPEG, GIF, PNG.

* Функция предпросмотра сообщения, без перезагрузки страницы.
