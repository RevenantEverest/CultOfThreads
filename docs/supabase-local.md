# Supabase Local

When starting a from a fresh clone make sure the following steps are taken:
    1. The `supabase/config.toml` value for signing_keys_path is set
        ```toml
        [auth]
        signing_keys_path = "./signing_keys.json"
        ```

### Useful Commands

1. Dump local db data - [Wiki](https://supabase.com/docs/guides/local-development/cli/getting-started)
    ```bash
    bun supabase db dump --local --data-only > supabase/seed.sql
    ```

2. Link supabase project - [Wiki](https://supabase.com/docs/guides/local-development/cli-workflows)
    ```bash
    bun supabase link --project-ref <project-id>
    ```
    - The `supabase:link` command inside `package.json` accomplishes this