# @pufflig/ps-chains

Prompt Studio allows you to chain editors, modifiers and external adapters to create more complex procedural text.

## Example chain

```json
{
  "definition": {
    "edges": [
      {
        "id": "1",
        "source": "1",
        "target": "2",
        "source_handle": "text",
        "target_handle": "template"
      },
      {
        "id": "2",
        "source": "2",
        "target": "3",
        "source_handle": "text",
        "target_handle": "input"
      }
    ],
    "nodes": [
      {
        "id": "1",
        "type": "input/template_editor",
        "editor": {
          "position": { "x": 0, "y": 0 }
        }
      },
      {
        "id": "2",
        "type": "modifier/handlebar_template_completion",
        "editor": {
          "position": { "x": 0, "y": 0 }
        }
      },
      {
        "id": "3",
        "type": "output/completion_display",
        "editor": {
          "position": { "x": 0, "y": 0 }
        }
      }
    ]
  },
  "state": {
    "1": {
      "status": "idle",
      "data": {}
    },
    "2": {
      "status": "idle",
      "data": {}
    },
    "3": {
      "status": "idle",
      "data": {}
    }
  }
}
```

## Storybook

You can preview the chain in a storybook by running:

```
yarn storybook
```
