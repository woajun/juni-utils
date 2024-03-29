import { to00 } from "./decimals";

const isYYYYMMDD = (dateString: string) => {
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateFormatRegex.test(dateString);
};

const parseDate = (dateString: string) => {
  if (isYYYYMMDD(dateString)) {
    const parts = dateString.split('-');
    return new Date(+parts[0], +parts[1] - 1, +parts[2]);
  }
  return new Date(dateString);
};

export const ensureDate = (target: Date | string): Date => {
  let date = target;
  if (typeof date === 'string') {
    date = parseDate(date);
  }
  return new Date(date);
};

type DateFormat =
  | 'D'
  | 'M월D일'
  | 'M월 D일'
  | 'MM월DD일'
  | 'MM/DD'
  | 'M. D (AAA)'
  | 'M. D AAA'
  | 'M. D AAA요일'
  | 'M.D'
  | 'MM.DD'
  | 'HH:MM'
  | 'YY.MM.DD'
  | 'YYYY-M-D'
  | 'YYYY년 M월 D일'
  | 'YYYY-MM-DD'
  | 'YYYY. M. D (AAA)'
  | 'MM/DD HH:MM'
  | 'MM월DD일 HH:MM'
  | '오전오후 H:MM'
  | '오전오후 H:MM:s초';

export const formatDate = (
  target: Date | string,
  format: DateFormat = 'YY.MM.DD',
) => {
  const date = ensureDate(target);

  const yyyy = date.getFullYear().toString();
  const yy = yyyy.slice(-2);
  const m = (date.getMonth() + 1).toString();
  const mm = m.padStart(2, '0');
  const d = date.getDate().toString();
  const dd = d.padStart(2, '0');
  const hh = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const s = date.getSeconds().toPrecision().padStart(2, '0');

  const aaa = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

  let h = date.getHours();
  const amOrPm = h < 12 ? '오전' : '오후';
  h = h % 12;
  h = h === 0 ? 12 : h;

  switch (format) {
    case 'D':
      return d;
    case 'M월D일':
      return `${m}월${d}일`;
    case 'M월 D일':
      return `${m}월 ${d}일`;
    case 'MM월DD일':
      return `${mm}월${dd}일`;
    case 'MM/DD':
      return `${mm}/${dd}`;
    case 'M. D (AAA)':
      return `${m}. ${d} (${aaa})`;
    case 'M. D AAA':
      return `${m}. ${d} ${aaa}`;
    case 'M. D AAA요일':
      return `${m}. ${d} ${aaa}요일`;
    case 'M.D':
      return `${m}.${d}`;
    case 'MM.DD':
      return `${mm}.${dd}`;
    case 'HH:MM':
      return `${hh}:${minutes}`;
    case 'YYYY-M-D':
      return `${yyyy}-${m}-${d}`;
    case 'YYYY년 M월 D일':
      return `${yyyy}년 ${mm}월 ${dd}일`;
    case 'YYYY-MM-DD':
      return `${yyyy}-${mm}-${dd}`;
    case 'YYYY. M. D (AAA)':
      return `${yyyy}. ${m}. ${d} (${aaa})`;
    case 'MM/DD HH:MM':
      return `${mm}/${dd} ${hh}:${minutes}`;
    case 'YY.MM.DD':
      return `${yy}.${mm}.${dd}`;
    case 'MM월DD일 HH:MM':
      return `${mm}월${dd}일 ${hh}:${minutes}`;
    case '오전오후 H:MM':
      return `${amOrPm} ${h}:${minutes}`;
    case '오전오후 H:MM:s초':
      return `${amOrPm} ${h}:${minutes}:${s}초`;
    default:
      return `${yy}.${mm}.${dd}`;
  }
};

export const adjustDate = (target: Date | string, amount: number): Date => {
  const date = ensureDate(target);
  date.setDate(date.getDate() + amount);
  return date;
};

export const isToday = (target: Date | string): boolean => {
  const targetDate = ensureDate(target);
  const today = new Date();
  return (
    today.getFullYear() === targetDate.getFullYear() &&
    today.getMonth() === targetDate.getMonth() &&
    today.getDate() === targetDate.getDate()
  )
}

export const getAllDatesOfMonth = (target: Date | string) => {
  const date = ensureDate(target);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const daysInMonth = new Date(year, month, 0).getDate();
  const dates = [];

  for (let i = 1; i <= daysInMonth; i++) {
    const formattedDate = `${year}-${to00(month)}-${to00(i)}`;
    dates.push(formattedDate);
  }

  return dates;
}

export const getLengthOfMonth = (target: Date | string) => {
  return getAllDatesOfMonth(target).length;
}