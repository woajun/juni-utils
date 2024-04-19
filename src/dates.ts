import { to00 } from './decimals';

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

const shortMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const months = [ 
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export type DateFormat =
  | 'D'
  | 'M'
  | 'MMM'
  | 'MMMM'
  | 'M월'
  | 'M월D일'
  | 'M월 D일'
  | 'MM월DD일'
  | 'MM/DD'
  | 'M. D (AAA)'
  | 'M. D AAA'
  | 'M. D AAA요일'
  | 'M.D'
  | 'MM.DD'
  | 'hh:mm'
  | 'YY.MM.DD'
  | 'YY-M'
  | 'YY년M월'
  | 'YYMMM'
  | 'YYYY'
  | 'YYYY-W'
  | 'YYYY/M'
  | 'YYYY-M-D'
  | 'YYYY년 M월 D일'
  | 'YYYY년M월'
  | 'YYYY-M'
  | 'YYYY-M-W'
  | 'YYYY-MM'
  | 'YYYY-MM-DD'
  | 'YYYY년 MM월 DD일'
  | 'YYYY.M.D'
  | 'YYYY. M. D (AAA)'
  | 'MM/DD hh:mm'
  | 'MM월DD일 hh:mm'
  | '오전오후 h:mm'
  | '오전오후 h:mm:ss초';

  /**
   * D 일
   * 
   * DD 두자릿 수 일
   * 
   * M 월
   * 
   * MM 두자릿 수 월
   * 
   * MMM 영어 간략 월
   * 
   * MMMM 영어 월
   * 
   * YYYY 연
   * 
   * YY 두자릿 수 연
   * 
   * W 그 달 몇번째 주 | 그 해 몇번째 주
   * 
   * AAA 요일
   * 
   * h 시간
   * 
   * hh 두자릿 수 시간
   * 
   * m 분
   * 
   * mm 두자릿 수 분
   * 
   * s 초
   * 
   * ss 두자릿 수 초
   * 
   * 오전오후
   * 
   */
export const formatDate = (
  target: Date | string,
  format: DateFormat = 'YY.MM.DD'
) => {
  const date = ensureDate(target);

  const yyyy = date.getFullYear().toString();
  const yy = yyyy.slice(-2);
  const m = (date.getMonth() + 1).toString();
  const mm = m.padStart(2, '0');
  const mmm = shortMonths[date.getMonth()]
  const mmmm = months[date.getMonth()]
  const d = date.getDate().toString();
  const dd = d.padStart(2, '0');
  const h = date.getHours();
  const hh = h.toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const s = date.getSeconds();
  const ss = s.toPrecision().padStart(2, '0');
  const aaa = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

  switch (format) {
    case 'D': {
      return d;
    }
    case 'M': {
      return m;
    }
    case 'MMM': {
      return mmm;
    }
    case 'MMMM': {
      return mmmm;
    }
    case 'M월': {
      return `${m}월`;
    }
    case 'M월D일': {
      return `${m}월${d}일`;
    }
    case 'M월 D일': {
      return `${m}월 ${d}일`;
    }
    case 'MM월DD일': {
      return `${mm}월${dd}일`;
    }
    case 'MM/DD': {
      return `${mm}/${dd}`;
    }
    case 'M. D (AAA)': {
      return `${m}. ${d} (${aaa})`;
    }
    case 'M. D AAA': {
      return `${m}. ${d} ${aaa}`;
    }
    case 'M. D AAA요일': {
      return `${m}. ${d} ${aaa}요일`;
    }
    case 'M.D': {
      return `${m}.${d}`;
    }
    case 'MM.DD': {
      return `${mm}.${dd}`;
    }
    case 'hh:mm': {
      return `${hh}:${minutes}`;
    }
    case 'YY.MM.DD': {
      return `${yy}.${mm}.${dd}`;
    }
    case 'YY-M': {
      return `${yy}-${m}`;
    }
    case 'YY년M월': {
      return `${yy}년${m}월`;
    }
    case 'YYMMM': {
      return `${yy}${mmm}`;
    }
    case 'YYYY': {
      return `${yyyy}`;
    }
    case 'YYYY-W': {
      const startOfYear = new Date(+yyyy, 0, 0);
      const diff = date.getTime() - startOfYear.getTime();
      const oneWeek = 1000 * 60 * 60 * 24 * 7;
      const weekNumber = Math.floor(diff / oneWeek);
      return `${yyyy}-${weekNumber}`;
    }
    case 'YYYY/M': {
      return `${yyyy}/${m}`;
    }
    case 'YYYY-M-D': {
      return `${yyyy}-${m}-${d}`;
    }
    case 'YYYY년M월': {
      return `${yyyy}년${m}월`;
    }
    case 'YYYY년 M월 D일': {
      return `${yyyy}년 ${m}월 ${d}일`;
    }
    case 'YYYY-M': {
      return `${yyyy}-${m}`;
    }
    case 'YYYY-M-W': {
      const w = Math.ceil((date.getDate() + 6 - date.getDay()) / 7);
      return `${yyyy}-${m}-${w}`;
    }
    case 'YYYY-MM': {
      return `${yyyy}-${mm}`;
    }
    case 'YYYY-MM-DD': {
      return `${yyyy}-${mm}-${dd}`;
    }
    case 'YYYY년 MM월 DD일': {
      return `${yyyy}년 ${mm}월 ${dd}일`;
    }
    case 'YYYY.M.D': {
      return `${yyyy}.${m}.${d}`;
    }
    case 'YYYY. M. D (AAA)': {
      return `${yyyy}. ${m}. ${d} (${aaa})`;
    }
    case 'MM/DD hh:mm': {
      return `${mm}/${dd} ${hh}:${minutes}`;
    }
    case 'MM월DD일 hh:mm': {
      return `${mm}월${dd}일 ${hh}:${minutes}`;
    }
    case '오전오후 h:mm': {
      const amOrPm = h < 12 ? '오전' : '오후';
      const displayHours = h % 12 === 0 ? 12 : h % 12;
      return `${amOrPm} ${displayHours}:${minutes}`;
    }
    case '오전오후 h:mm:ss초': {
      const amOrPm = h < 12 ? '오전' : '오후';
      const displayHours = h % 12 === 0 ? 12 : h % 12;
      return `${amOrPm} ${displayHours}:${minutes}:${ss}초`;
    }
    default:
      return `${yyyy}-${mm}-${dd}`;
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
  );
};

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
};

export const getLengthOfMonth = (target: Date | string) => {
  return getAllDatesOfMonth(target).length;
};

export const getDates = (
  from: Date,
  to: Date,
  step: 'day' | 'week' | 'month' | 'year' = 'day'
): Date[] => {
  const dates: Date[] = [];

  let currentDate = new Date(from);
  const endDate = new Date(to);

  while (currentDate <= endDate) {
    switch (step) {
      case 'day':
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
        break;
      case 'week':
        const firstDayOfWeek = new Date(currentDate);
        firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        dates.push(firstDayOfWeek);
        currentDate.setDate(currentDate.getDate() + (7 - currentDate.getDay()));
        break;
      case 'month':
        const firstDayOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        dates.push(firstDayOfMonth);
        currentDate.setMonth(currentDate.getMonth() + 1);
        currentDate.setDate(1);
        break;
      case 'year':
        const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
        dates.push(firstDayOfYear);
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        currentDate.setMonth(0);
        currentDate.setDate(1);
        break;
      default:
        throw new Error(
          'Invalid step value. It should be one of "day", "week", "month", or "year".'
        );
    }
  }

  return dates;
};
