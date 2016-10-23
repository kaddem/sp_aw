# Промо страница замечательной премии

Клонируем в текущую папку (точка в конце через пробел):
```
$ git clone https://github.com/kaddem/sp_aw.git .
```

Избавляемся от привязки к удаленному репозиторию (если надо):
```
git remote rm origin
```

Ставим зависимости:
```
npm install
```

## Инициализация

После внесения изменений в `settings.json` и прочие файлы, выполнить:
```
gulp init
```

Таск установит jQuery (если нужно), соберет файлы в папку `dist`

## Запуск

Запускаем на отслеживание изменений и пересборку с Browsersync на http://localhost:3000:
```
gulp serve
```

Либо просто на отслеживание изменений и пересборку:
```
gulp watch
```

## Пересборка

Если нужно пересобрать файлы с измененными параметрами (пути, генерация sourcemap, jQuery), то меняем их в `settings.json` и запускаем:
```
gulp build
```

## Особая благодарность

- Свете Лоленко за основу для сборки: [https://github.com/eveness/gulp](https://github.com/eveness/gulp)