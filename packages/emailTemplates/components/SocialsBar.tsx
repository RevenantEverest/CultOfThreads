import {
    Row,
    Column,
    Img,
} from 'react-email';
import { SOCIAL_LINKS } from '@repo/ui';

const socials = [
    { name: "Discord", url: SOCIAL_LINKS.DISCORD.url, icon: "https://cdn.imgchest.com/files/e45fcb304cb8.png" },
    { name: "Instagram", url: SOCIAL_LINKS.INSTAGRAM.url, icon: "https://cdn.imgchest.com/files/8c751f141648.png" },
    { name: "TikTok", url: SOCIAL_LINKS.TIK_TOK.url, icon: "https://cdn.imgchest.com/files/229307c4c08e.png" }
];

export default function SocialsBar() {
    return(
        <Row align="center" style={{ width: "auto" }}>
            {
                socials.map((item) => (
                    <Column 
                        key={item.name} 
                        align="center" 
                        style={{
                            width: "32px",
                            padding: "0 6px"
                        }}
                    >
                        <a href={item.url}>
                            <Img 
                                height={24} 
                                width={24} 
                                src={item.icon} 
                                alt={item.name}
                                style={{
                                    width: "24px",
                                    height: "24px",
                                    display: "block"
                                }}    
                            />
                        </a>
                    </Column>
                ))
            }
        </Row>
    );
};