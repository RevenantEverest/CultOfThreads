import { Section, Text, Link } from 'react-email';
import SocialsBar from './SocialsBar';

import * as themes from '@repo/ui/themes';

export default function Footer() {
    return(
        <Section>
            <Text className="text-gray-400 text-xs text-center mt-8">
                If you have questions, please send an email to <Link href="mailto:contact@cultofthreads.com" style={{ color: themes.cute.colors.primary }}>contact@cultofthreads.com</Link>.
            </Text>
            <SocialsBar />
        </Section>
    );
};