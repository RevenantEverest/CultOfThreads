import { useThemeStore } from '@@shop/store/theme';
import { useAppForm } from '@repo/ui/hooks';
import { FaSearch } from 'react-icons/fa';

interface SearchProps {
    setSearch: (value: string) => void,
    defaultValue?: string
};

function Search({ setSearch, defaultValue }: SearchProps) {
    
    const theme = useThemeStore((state) => state.theme);

    const form = useAppForm({
        defaultValues: {
            search: ""
        }
    });

    return(
        <form>
            <form.AppForm>
                <form.AppField
                    name="search"
                    listeners={{
                        onChange: ({ value }) => {
                            setSearch(value);
                        },
                    }}
                    children={(field) => (
                        <field.TextField 
                            type="text" 
                            icon={FaSearch} 
                            theme={theme}
                            defaultValue={defaultValue}
                        />
                    )}    
                >
                </form.AppField>
            </form.AppForm>
        </form>
    );
};

export default Search;