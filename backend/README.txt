Для запуска проекта первым делом нужен Python версии 3.11 или выше. 
Чтобы установить нужные библиотеки нужно иметь pip, после войти через консоль в папку проекта. Например:

1. Предположим что проект находится в диске C: в папке под названием "jalday", при запуске командной строки выходит что-то по типу:
'C:/Users/{имя пользователя}>'. Нам нужно чтобы было
'C:/jalday>'. Чтобы это сделать нужно прописать в эту же консоль команду: "cd C:/jalday", после должно выйти "C:/jalday>".

2. Для установки всех нужных библиотек, в эту же консоль нужно ввести команду "pip install -r requirements.txt" или
"python -m pip install -r requirements.txt", либо же "py -m pip install -r requirements.txt".

3. После загрузки всех библиотек, пишем команду "python manage.py runserver" или "py manage.py runserver"

4. Если вышло вот так: 
"Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
June 03, 2024 - 05:02:37
Django version 5.0.6, using settings 'settings.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK."

значит приложение запущено, и все работает отлично!

Если у вас отсутсвует Python на вашем компьютере, установите его через Microsoft Store. Это самый быстрый способ установить. Если установленный Python из Microsoft Store 
не работает, установите с сайта https://www.python.org/downloads/release/python-3123/, и жмите на галочку на каждом этапе установки.