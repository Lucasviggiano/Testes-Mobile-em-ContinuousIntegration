# Mobile QA Architecture and CI/CD Flow

## Architecture flow
```mermaid
flowchart TD
    A["tests/smoke + tests/regression"] --> B["pages (POM layer)"]
    B --> C["utils (env, capabilities, browserstack hooks)"]
    C --> D["configs (base, android local, browserstack cloud)"]
    D --> E["WebdriverIO Runner"]
    E --> F["Appium / BrowserStack Device Farm"]
    F --> G["App Under Test (Android)"]
    E --> H["Allure + Logs"]
    F --> I["BrowserStack Video + Device Logs + Network Logs"]
```

## CI/CD flow
```mermaid
flowchart LR
    A["Developer push on branch ci"] --> B["GitHub Actions: mobile-ci.yml"]
    B --> C["Validate secrets"]
    C --> D["Install dependencies"]
    D --> E["Resolve app id (Secret/File/URL)"]
    E --> F["Run regression cloud suite"]
    F --> G["Run smoke cloud suite"]
    G --> H["Generate Allure"]
    H --> I["Upload artifacts"]
    F --> J["BrowserStack Session + Video"]
    G --> J
```

## Technical layers
1. `tests/`: business intent and acceptance rules (smoke and regression separation).
2. `pages/`: UI contracts encapsulated with resilient selectors.
3. `utils/`: cross-cutting concerns (env management, capabilities, cloud status integration).
4. `configs/`: runtime orchestration and platform/environment decoupling.
5. `workflow`: CI governance, cloud provisioning, evidence pipeline.

## Long-term quality strategy
- Minimize flakiness with stable selectors and synchronized waits.
- Keep tests deterministic with isolated suites and explicit env validation.
- Standardize evidence to speed up triage and root-cause analysis.
- Scale by adding capability matrix and parallel execution in cloud.
