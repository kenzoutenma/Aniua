'use client';

import settingsConfig, { setting } from '@/shared/constants/settings-constant';
import { useSettingsStore } from '@/shared/state/settings-store';
import { Button } from '@/shared/ui';

import SettingField from '@/features/user/components/setting-field';
import Section from '@/shared/layout/section/section';
import { getTranslatedText } from '@/shared/lib';
import Link from 'next/link';
import { memo, useCallback, useMemo, useState } from 'react';

export default function settings() {
  const setSetting = useSettingsStore((s) => s.setSetting);
  const settingsData = useSettingsStore((s) => s.settings);
  const [formState, setFormState] = useState<Record<string, Record<string, string>>>({});

  const handleChange = useCallback((section: string, key: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  }, []);

  const handleSectionSubmit = async (section: string, options: Record<string, setting>) => {
    const changes = formState[section];
    if (!changes) return;
    const apiPayload: Record<string, string> = {};

    for (const [key, value] of Object.entries(changes)) {
      const config = options[key];
      if (!config) continue;

      if (config.way === 'api' && config.postbodykey) {
        apiPayload[config.postbodykey] = value;
      } else if (config.way === 'local') {
        let parsedValue: string | boolean = value;

        if (config.type == 'radio') {
          parsedValue = value === 'true';
        } else {
          parsedValue = value;
        }

        setSetting(config.change as keyof UserSettings, parsedValue);
      }
    }

    if (Object.keys(apiPayload).length > 0) {
      await fetch('/api/settings/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiPayload),
      });
    }
  };

  return (
    <Section typeOfSection="TwoColSection">
      <Section.Col widthState="1/4">
        Settings
        {Object.entries(settingsConfig).map(([section]) => (
          <Button variant="default" key={section} as={Link} href={`#settings-${section}`}>
            {section}
          </Button>
        ))}
      </Section.Col>
      <Section.Col widthState="3/4">
        {Object.entries(settingsConfig).map(([section, options]) => {
          const memoOptions = useMemo(() => options, [options]);
          return (
            <div key={section} id={`settings-${section}`}>
              <h2 className="text-xl font-bold mb-2 capitalize">{section}</h2>
              <OptionsBlock
                section={section}
                options={memoOptions}
                formState={formState}
                settingsData={settingsData}
                handleChange={handleChange}
              />
              <Button variant="primary" onClick={() => handleSectionSubmit(section, options)}>
                {getTranslatedText('settings.save')}
              </Button>
            </div>
          );
        })}
      </Section.Col>
    </Section>
  );
}

interface OptionsBlockProps {
  section: string;
  options: Record<string, setting>;
  formState: Record<string, Record<string, string>>;
  settingsData: UserSettings;
  handleChange: (section: string, key: string, value: string) => void;
}

const OptionsBlock = memo(
  ({ section, options, formState, settingsData, handleChange }: OptionsBlockProps) => {
    return Object.entries(options).map(([key, config]) => {
      const inputValue =
        formState?.[section]?.[key] ?? resolveFromPath(settingsData, config.change);
      return (
        <SettingField
          key={key}
          section={section}
          keyName={key}
          config={config}
          value={inputValue}
          onChange={handleChange}
        />
      );
    });
  },
);
OptionsBlock.displayName = 'OptionsBlock';

function resolveFromPath(obj: unknown, path: string): string | number | boolean | null | undefined {
  return path.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && acc !== null && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj) as string | number | boolean | null | undefined;
}
