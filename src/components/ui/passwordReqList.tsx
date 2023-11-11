'use client';

import { useEffect, useState } from 'react';
import { TbCheck, TbX } from 'react-icons/tb';
import { RegexValidations } from '@/lib/utils';

const currentColor = ['bg-gray-500', 'bg-[#FF0000]', 'bg-[#E04F1A]', 'bg-[#E04F1A]', 'bg-[#E04F1A]', 'bg-[#52B48C]'];

export interface IPasswordReqListProps {
  passwordValue: string;
  setPass?: (value: boolean) => void;
}

export function PasswordReqList({ passwordValue, setPass }: IPasswordReqListProps) {
  const [totalPassed, setTotalPassed] = useState(0);
  const [passMinCharLength, setPassMinCharLength] = useState(false);
  const [passNum, setPassNum] = useState(false);
  const [passLowCase, setPassLowCase] = useState(false);
  const [passUpCase, setPassUpCase] = useState(false);
  const [passSpecialChar, setPassSpecialChar] = useState(false);

  const updateConditionsPassed = () => {
    setTotalPassed((i) => (i < 5 ? i + 1 : i));
  };

  const onPasswordValidation = () => {
    if (passwordValue.length >= 6 && !passMinCharLength) {
      setPassMinCharLength(true);
      updateConditionsPassed();
    } else if (!(passwordValue.length >= 6) && passMinCharLength) {
      setPassMinCharLength(false);
      setTotalPassed((i) => i - 1);
    }

    if (RegexValidations.hasNumber.exec(passwordValue) && !passNum) {
      setPassNum(true);
      updateConditionsPassed();
    } else if (!RegexValidations.hasNumber.exec(passwordValue) && passNum) {
      setPassNum(false);
      setTotalPassed((i) => i - 1);
    }

    if (RegexValidations.hasLowerCase.exec(passwordValue) && !passLowCase) {
      setPassLowCase(true);
      updateConditionsPassed();
    } else if (!RegexValidations.hasLowerCase.exec(passwordValue) && passLowCase) {
      setPassLowCase(false);
      setTotalPassed((i) => i - 1);
    }

    if (RegexValidations.hasUpperCase.exec(passwordValue) && !passUpCase) {
      setPassUpCase(true);
      updateConditionsPassed();
    } else if (!RegexValidations.hasUpperCase.exec(passwordValue) && passUpCase) {
      setPassUpCase(false);
      setTotalPassed((i) => i - 1);
    }

    if (RegexValidations.hasSpecialChar.exec(passwordValue) && !passSpecialChar) {
      setPassSpecialChar(true);
      updateConditionsPassed();
    } else if (!RegexValidations.hasSpecialChar.exec(passwordValue) && passSpecialChar) {
      setPassSpecialChar(false);
      setTotalPassed((i) => i - 1);
    }
  };

  const ListItem = ({ itemTitle, isPass }: { itemTitle: string; isPass: boolean }) => (
    <div className='flex items-center space-x-2 text-gray-400'>
      {isPass ? <TbCheck className='h-[22px] w-[22px] text-green-500' /> : <TbX className='h-[18px] w-[18px] text-red-400' />}
      <p>{itemTitle}</p>
    </div>
  );

  useEffect(() => {
    onPasswordValidation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordValue]);

  useEffect(() => {
    setPass && setPass(totalPassed === 5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPassed]);

  return (
    <div className='flex flex-col gap-3 pt-3'>
      <div className='grid grid-cols-5 gap-2'>
        <div className={`h-[5px] rounded-xl transition-colors duration-300 ${currentColor[totalPassed]}`} />
        <div
          className={`h-[5px] rounded-xl transition-colors duration-300 ${currentColor[totalPassed >= 2 ? totalPassed : 0]}`}
        />
        <div
          className={`h-[5px] rounded-xl transition-colors duration-300 ${currentColor[totalPassed >= 3 ? totalPassed : 0]}`}
        />
        <div
          className={`h-[5px] rounded-xl transition-colors duration-300 ${currentColor[totalPassed >= 4 ? totalPassed : 0]}`}
        />
        <div
          className={`h-[5px] rounded-xl transition-colors duration-300 ${currentColor[totalPassed === 5 ? totalPassed : 0]}`}
        />
      </div>
      <div className='flex flex-col rounded-md bg-gray-600 p-6 lg:flex-row lg:gap-6'>
        <div>
          <ListItem itemTitle='Has at least 6 characters' isPass={passMinCharLength} />
          <ListItem itemTitle='Includes number' isPass={passNum} />
          <ListItem itemTitle='Includes lowercase letter' isPass={passLowCase} />
        </div>

        <div>
          <ListItem itemTitle='Includes uppercase letter' isPass={passUpCase} />
          <ListItem itemTitle='Includes special symbol' isPass={passSpecialChar} />
        </div>
      </div>
    </div>
  );
}
