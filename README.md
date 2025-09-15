Supabase:
project name: sugar-plum-v2
password: sugar-plum-v2

project_url: https://egwzjdwzkepnramrxpoe.supabase.co
api_key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnd3pqZHd6a2VwbnJhbXJ4cG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMTc1NzQsImV4cCI6MjA2OTg5MzU3NH0.u41AS8fxSvudo_bCVoOImleEmrs6ir63JStY3upkGCg


```

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://egwzjdwzkepnramrxpoe.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
```