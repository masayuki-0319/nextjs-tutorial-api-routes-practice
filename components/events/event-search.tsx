import { FormEvent, useRef, VFC } from 'react';

import { Button } from '../ui/button';
import classes from './event-search.module.css';

type Props = {
  onSearch: (month: string, year: string) => any;
};

export const EventSearch: VFC<Props> = (props) => {
  const { onSearch } = props;
  const yearInputRef = useRef<HTMLSelectElement>(null);
  const monthInputRef = useRef<HTMLSelectElement>(null);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedYear = yearInputRef.current!.value;
    const selectedMonth = monthInputRef.current!.value;

    onSearch(selectedYear, selectedMonth);
  };

  return (
    <form className={classes.form} onSubmit={(e) => submitHandler(e)}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor='year'>Year</label>
          <select id='year' ref={yearInputRef}>
            <option value='2021'>2021</option>
            <option value='2022'>2022</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor='month'>Month</label>
          <select id='month' ref={monthInputRef}>
            <option value='1'>1月</option>
            <option value='2'>2月</option>
            <option value='3'>3月</option>
            <option value='4'>4月</option>
            <option value='5'>5月</option>
            <option value='6'>6月</option>
            <option value='7'>7月</option>
            <option value='8'>8月</option>
            <option value='9'>9月</option>
            <option value='10'>10月</option>
            <option value='11'>11月</option>
            <option value='12'>12月</option>
          </select>
        </div>
      </div>
      <Button>イベント検索</Button>
    </form>
  );
};
