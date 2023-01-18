import React from 'react';
import { Schedule } from '@/api/server/schedules/getServerSchedules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import tw from 'twin.macro';
import ScheduleCronRow from '@/components/server/schedules/ScheduleCronRow';

export default ({ schedule }: { schedule: Schedule }) => (
    <>
        <div css={tw`hidden md:block border-4 border-dactyl-orange2 p-2 rounded-full`}>
            <FontAwesomeIcon icon={faCalendarAlt} fixedWidth />
        </div>
        <div css={tw`flex-1 md:ml-4`}>
            <p css={tw`text-base text-dactyl-purple2`}>{schedule.name}</p>
            <p css={tw`text-xs text-neutral-400`}>
                {schedule.lastRunAt ? 'Last run at: ' : ''}
                <span css={tw`text-dactyl-orange2`}>{schedule.lastRunAt ? format(schedule.lastRunAt, 'MMM do \'at\' h:mma') : 'It was never run.'}</span>
            </p>
        </div>
        <div>
        <p
                css={[
                    tw`py-1 px-3 rounded-2xl text-xs uppercase text-white sm:hidden`,
                    schedule.isActive ? tw`bg-dactyl-green` : tw`bg-neutral-400`,
                ]}
            >
                {schedule.isActive ? 'Active' : 'Inactive'}
            </p>
        </div>
        <ScheduleCronRow cron={schedule.cron} css={tw`mx-auto sm:mx-8 w-full sm:w-auto mt-4 sm:mt-0`} />
        <div>
        <p
                css={[
                    tw`py-1 px-3 rounded-2xl text-xs uppercase text-white hidden sm:block`,
                    schedule.isActive && !schedule.isProcessing ? tw`bg-dactyl-green` : (schedule.isProcessing ? tw`bg-primary-200` : tw`bg-dactyl-red`),
                ]}
            >
                {schedule.isProcessing ? 'Processing' : schedule.isActive ? 'Active' : 'Inactive'}
            </p>
        </div>
    </>
);
