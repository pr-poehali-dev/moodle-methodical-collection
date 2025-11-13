import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Section {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  tips: { title: string; content: string }[];
}

const sections: Section[] = [
  {
    id: 'courses',
    title: 'Создание курсов',
    icon: 'BookOpen',
    description: 'Как создать и настроить курс в Moodle',
    color: 'bg-blue-50 border-blue-200',
    tips: [
      {
        title: 'Создание нового курса',
        content: 'Перейдите в "Управление сайтом" → "Курсы" → "Добавить курс". Заполните название, краткое название и описание курса. Выберите формат курса (темы, недели, одна тема).'
      },
      {
        title: 'Настройка структуры',
        content: 'Разделите курс на логические блоки - темы или недели. Каждый раздел может содержать материалы и задания. Используйте понятные названия разделов.'
      },
      {
        title: 'Видимость курса',
        content: 'В настройках курса выберите, кто может видеть курс. Скрытый курс доступен только преподавателям. Видимый курс отображается для всех зачисленных студентов.'
      }
    ]
  },
  {
    id: 'assignments',
    title: 'Работа с заданиями',
    icon: 'ClipboardList',
    description: 'Создание и проверка заданий',
    color: 'bg-purple-50 border-purple-200',
    tips: [
      {
        title: 'Типы заданий',
        content: 'В Moodle есть несколько типов: загрузка файла, текст онлайн, офлайн-задание. Выберите подходящий тип в зависимости от формата работы студентов.'
      },
      {
        title: 'Настройка сроков',
        content: 'Укажите дату начала приёма работ и крайний срок сдачи. Можно включить "льготный период" для опоздавших. Система автоматически отметит просроченные работы.'
      },
      {
        title: 'Критерии оценивания',
        content: 'Добавьте подробное описание задания и критерии оценивания. Укажите максимальный балл. Можно использовать рубрики для детальной оценки.'
      },
      {
        title: 'Проверка работ',
        content: 'Открывайте задание → "Просмотр всех ответов". Оценивайте работы, оставляйте комментарии. Студенты получат уведомления о проверке.'
      }
    ]
  },
  {
    id: 'testing',
    title: 'Тестирование студентов',
    icon: 'FileCheck',
    description: 'Создание и настройка тестов',
    color: 'bg-green-50 border-green-200',
    tips: [
      {
        title: 'Банк вопросов',
        content: 'Создавайте вопросы в "Банке вопросов". Типы: множественный выбор, верно/неверно, короткий ответ, эссе, сопоставление. Группируйте вопросы по категориям.'
      },
      {
        title: 'Настройка теста',
        content: 'Добавьте элемент "Тест" в курс. Выберите вопросы из банка или создайте новые. Настройте количество попыток, время прохождения, порядок вопросов.'
      },
      {
        title: 'Параметры прохождения',
        content: 'Укажите даты доступности теста. Можно перемешивать вопросы и варианты ответов. Настройте, что видит студент после прохождения.'
      },
      {
        title: 'Анализ результатов',
        content: 'Просматривайте статистику по тесту: средний балл, сложность вопросов. Экспортируйте результаты в Excel. Пересматривайте попытки студентов.'
      }
    ]
  },
  {
    id: 'materials',
    title: 'Загрузка материалов',
    icon: 'Upload',
    description: 'Размещение файлов и ресурсов',
    color: 'bg-orange-50 border-orange-200',
    tips: [
      {
        title: 'Типы ресурсов',
        content: 'Файл - загрузка документов, презентаций. Папка - группировка файлов. URL - ссылка на внешний ресурс. Страница - текст с форматированием прямо в Moodle.'
      },
      {
        title: 'Загрузка файлов',
        content: 'Перетаскивайте файлы прямо в раздел курса или используйте "Добавить элемент/ресурс". Поддерживаются PDF, Word, PowerPoint, видео, аудио.'
      },
      {
        title: 'Организация контента',
        content: 'Группируйте связанные материалы в папки. Используйте понятные названия файлов. Добавляйте описания к ресурсам для пояснения содержимого.'
      },
      {
        title: 'Встраивание видео',
        content: 'Загружайте видео на YouTube или другие платформы. Вставляйте ссылку в ресурс "URL" или встраивайте через HTML в "Страницу".'
      }
    ]
  },
  {
    id: 'tips',
    title: 'Полезные советы',
    icon: 'Lightbulb',
    description: 'Рекомендации по работе',
    color: 'bg-yellow-50 border-yellow-200',
    tips: [
      {
        title: 'Единый стиль оформления',
        content: 'Используйте одинаковую структуру для всех разделов курса. Придерживайтесь единого стиля названий и форматирования. Это облегчит навигацию студентам.'
      },
      {
        title: 'Регулярное обновление',
        content: 'Актуализируйте материалы курса перед началом семестра. Удаляйте устаревшую информацию. Добавляйте актуальные примеры и задания.'
      },
      {
        title: 'Обратная связь',
        content: 'Своевременно отвечайте на вопросы в форумах. Оставляйте комментарии к работам студентов. Проводите опросы для улучшения курса.'
      },
      {
        title: 'Резервное копирование',
        content: 'Регулярно создавайте резервные копии курса через "Настройки курса" → "Резервное копирование". Сохраняйте копии вне Moodle для надёжности.'
      }
    ]
  },
  {
    id: 'grading',
    title: 'Система оценивания',
    icon: 'Award',
    description: 'Настройка и работа с оценками',
    color: 'bg-pink-50 border-pink-200',
    tips: [
      {
        title: 'Журнал оценок',
        content: 'Откройте "Оценки" в курсе. Здесь собираются все баллы студентов автоматически. Можно добавлять ручные элементы оценивания.'
      },
      {
        title: 'Шкалы оценивания',
        content: 'Используйте числовые шкалы (0-100) или создавайте собственные (зачёт/незачёт, отлично/хорошо/удовлетворительно). Настройте в "Управление сайтом" → "Оценки".'
      },
      {
        title: 'Веса элементов',
        content: 'Назначьте вес разным типам работ: экзамен - 40%, задания - 40%, тесты - 20%. Итоговая оценка рассчитается автоматически.'
      },
      {
        title: 'Экспорт оценок',
        content: 'Выгружайте журнал оценок в Excel или CSV. Это удобно для отчётности и анализа успеваемости группы.'
      }
    ]
  },
  {
    id: 'communication',
    title: 'Общение со студентами',
    icon: 'MessageCircle',
    description: 'Инструменты коммуникации',
    color: 'bg-indigo-50 border-indigo-200',
    tips: [
      {
        title: 'Форумы',
        content: 'Создайте форум для объявлений (только вы пишете) и форум для вопросов (студенты могут создавать темы). Студенты получают уведомления о новых сообщениях.'
      },
      {
        title: 'Личные сообщения',
        content: 'Отправляйте личные сообщения через Moodle. Нажмите на имя студента → "Отправить сообщение". Переписка сохраняется в системе.'
      },
      {
        title: 'Объявления',
        content: 'Используйте новостной форум для важных объявлений. Все студенты курса автоматически подписаны и получат уведомление на email.'
      },
      {
        title: 'Групповая работа',
        content: 'Создавайте группы студентов для совместных проектов. Настройте групповые форумы и задания. Студенты одной группы будут видеть только свою работу.'
      }
    ]
  }
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<string>('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="GraduationCap" size={48} className="text-primary" />
            <h1 className="text-5xl font-bold text-gray-800">Методическая копилка Moodle</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Понятное руководство по возможностям системы дистанционного обучения для преподавателей
          </p>
          <Badge variant="secondary" className="mt-4 text-base px-4 py-2">
            8 основных разделов
          </Badge>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {sections.map((section, index) => (
            <Card 
              key={section.id} 
              className={`hover-scale transition-all cursor-pointer ${
                activeSection === section.id ? 'ring-2 ring-primary shadow-lg' : ''
              } ${section.color}`}
              onClick={() => setActiveSection(section.id)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <Icon name={section.icon as any} size={32} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{section.title}</CardTitle>
                    <CardDescription className="text-base">{section.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{section.tips.length} совет(-а/-ов)</span>
                  <Icon name="ChevronRight" size={20} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {activeSection && (
          <div className="animate-fade-in">
            <Card className="mb-8">
              <CardHeader className="bg-gradient-to-r from-primary to-accent text-white">
                <div className="flex items-center gap-4">
                  <Icon 
                    name={sections.find(s => s.id === activeSection)?.icon as any} 
                    size={40} 
                  />
                  <div>
                    <CardTitle className="text-2xl text-white">
                      {sections.find(s => s.id === activeSection)?.title}
                    </CardTitle>
                    <CardDescription className="text-blue-100">
                      Подробные инструкции и рекомендации
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  {sections.find(s => s.id === activeSection)?.tips.map((tip, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`}>
                      <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="rounded-full w-8 h-8 flex items-center justify-center">
                            {idx + 1}
                          </Badge>
                          {tip.title}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-base text-gray-700 leading-relaxed pl-11">
                        {tip.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        )}

        <footer className="text-center mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Icon name="Info" size={20} />
            <p className="text-sm">
              Нажмите на любой раздел выше, чтобы увидеть подробные инструкции
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
