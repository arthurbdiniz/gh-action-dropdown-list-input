# gh-action-dropdown-list-input

Extends GitHub Action UI replacing plain text input fields to the dropdown.

![showcase](images/showcase.png)

## Install extension

## Usage

- Add inputs separated by `commas` and the default value by `brackets`.
- Then consume the selected value extracting from the string using `awk` or `sed`.

```yml
name: gh-action-dropdown-list-input

on:
  workflow_dispatch:
    inputs:
      environments:
        description: 'Environments'
        required: true
        default: 'dev,staging,[uat],prod'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Format inputs
        run: |
          echo "::set-output name=environment::$(echo ${{ github.event.inputs.environments }} | awk -F'[][]' '{print $2}')"
        id: format_inputs
      - name: Print environment using format inputs step
        run: echo ${{ steps.format_inputs.outputs.environment }}
      - name: Print environment using awk
        run: echo ${{ github.event.inputs.environments }} | awk -F'[][]' '{print $2}'
      - name: Print environment using sed
        run: echo ${{ github.event.inputs.environments }} | sed 's/.*\[\([^]]*\)\].*/\1/g'
```

## License

Apache 2 Licensed. See [LICENSE](https://github.com/arthurbdiniz/gh-action-dropdown-list-input/blob/master/LICENSE) for full details.