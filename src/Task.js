import React from "react";
/* 
const eoLocale = require('date-fns/locale/eo')
const result = formatDistanceToNow(
  new Date(2016, 7, 1),
  {locale: eoLocale, addSuffix: true}
)
 */

import { formatDistanceToNow, differenceInDays } from "date-fns";

import { tr } from "date-fns/locale";

const Task = ({ taskObj, onComplete }) => {
  const deadlineInDate = new Date(taskObj.deadline);

  const deadlineInText = formatDistanceToNow(deadlineInDate, {
    addSuffix: true,
    locale: tr,
  });

  const today = new Date();

  function getClassName(date) {
    const diff = differenceInDays(date, today);
    // tailwind config içindeki değişken ile class ismi oluşturuluyor
    // return diff > 3 ? "normal" : "bg-0823-error";

    // arbitrary değer eklemek
    return diff > 3 ? "normal" : "bg-[#ffd9d4]";
  }

  const bg = getClassName(deadlineInDate);

  return (
    <div className="task ">
      <h3 className="text-lg text-[#c8781a]">{taskObj.title}</h3>
      <div className="deadline">
        son teslim: <span className={bg}>{deadlineInText}</span>
      </div>
      <p className="pt-2 px-0 pb-3 text-sm color-[#444]">
        {taskObj.description}
      </p>
      <div>
        {taskObj.people.map((p) => (
          <span className="pill" key={p}>
            {p}
          </span>
        ))}
      </div>
      {onComplete && (
        <button
          className="block py-2 px-3 ml-auto bg-[#fecc91] shadow-md rounded border-0 cursor-pointer"
          onClick={() => onComplete(taskObj.id)}
        >
          Tamamlandı
        </button>
      )}
    </div>
  );
};

export default Task;
