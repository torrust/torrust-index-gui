import {useState} from "#app";
import {Settings, TrackerMode} from "torrust-index-types-lib";

export const useSettings = () => useState<Settings>('settings', () => new Settings())

export function isTrackerPublic(): boolean {
    const settings = useSettings();

    return settings.value.tracker_mode == TrackerMode.Public || settings.value.tracker_mode == TrackerMode.Whitelisted;
}
