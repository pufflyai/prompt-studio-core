# @pufflig/ps-chains

Prompt Studio allows you to chain editors, modifiers and external adapters to create more complex logic.

Completion chain Definition

```json
{
  "nodes": [
    {
      "type": "editor/completion",
      "enabled": true,
      "write": "prompt",
      "options": {
        "prompt": "Hello {{world}}"
      }
    },
    {
      "type": "modifier/template",
      "enabled": true,
      "write": "prompt",
      "options": {
        "params": {
          "world": {
            "value": "${{SNIPPET:<ID>}}"
          }
        }
      }
    },
    {
      "type": "adapter/openai",
      "enabled": true,
      "write": "completion",
      "options": {
        "settings": {
          "apiKey": "${{SECRET:open_ai/api_key}}"
        },
        "model": {
          "name": "davinci",
          "parameters": {
            "temperature": 0.5,
            "maxTokens": 100
          }
        }
      }
    }
  ]
}
```

"all" -> pass all chat into the node, replace all chat
"last" -> pass only last item to the node, replace last item in the chat
