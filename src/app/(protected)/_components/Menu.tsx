import { TbSquareRoundedChevronDownFilled, TbLogout, TbSettings } from 'react-icons/tb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogoutItem } from './LogoutItem';

export function Menu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <TbSquareRoundedChevronDownFilled className='transition-color h-[30px] w-[30px] cursor-pointer duration-150 hover:text-gray-200' />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-80 font-medium'
        sideOffset={15}
        collisionPadding={{
          right: 25,
        }}
      >
        <DropdownMenuLabel className='text-gray-400'>MY SPACE</DropdownMenuLabel>
        <DropdownMenuItem>
          <div className='flex w-full flex-row gap-3'>
            <div className='rounded-sm bg-gray-300 p-3'>MB</div>
            <div className='flex flex-col'>
              <h1 className='text-lg font-bold'>SWATKING</h1>
              <h2 className='text-sm text-gray-400'>marco.butalid@kroma.ph</h2>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className='flex cursor-pointer flex-col space-y-3'>
          <div className='flex w-full justify-between'>
            <span>Manage Account</span>
            <TbSettings className='mr-2 h-4 w-4' />
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer'>
          <LogoutItem>
            <TbLogout className='mr-2 h-4 w-4' />
            <span>Log out</span>
          </LogoutItem>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
