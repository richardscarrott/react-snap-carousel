# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.1] - 2023-02-14

### Added

- `options.initialPages` to allow SSR to render pages when known up front (e.g. there is only 1 item per page).

## [0.3.0] - 2023-02-14

### Added

- Support for scroll padding & scroll margin [#3](https://github.com/richardscarrott/react-snap-carousel/issues/3)

## [0.2.0] - 2023-02-02

### Changed

- Snap point CSS declarations (`scroll-snap-align: start`) are no longer applied automatically. This means by default, a carousel will not snap to a page. [#6](https://github.com/richardscarrott/react-snap-carousel/issues/6)

  - Instead a `Set` of item indexes called `snapPointIndexes` is provided to allow carousels to render snap points themselves. This change was necessary to ensure DOM updates are only performed by React.

    #### Before

    ```tsx
    const Carousel = () => {
      const { scrollRef } = useSnapCarousel();
      return (
        <ul ref={scrollRef}>
          {Array.from({ length: 16 }).map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      );
    };
    ```

    #### After

    ```tsx
    const Carousel = () => {
      const { scrollRef, snapPointIndexes } = useSnapCarousel();
      return (
        <ul ref={scrollRef}>
          {Array.from({ length: 16 }).map((item, i) => (
            <li
              style={{
                scrollSnapAlign: snapPointIndexes.has(i) ? 'start' : ''
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      );
    };
    ```

### Removed

- `options.snapPointClassName` has been removed as it's no longer needed.

## [0.1.0] - 2023-01-13

### Changed

- Refactor pages algorithm, ensuring pages are correctly calculated. [#1](https://github.com/richardscarrott/react-snap-carousel/issues/1)

## [0.0.3] - 2022-12-20

### Added

- Support for vertical axis carousels

## [0.0.2] - 2022-12-19

### Removed

- Debug code

## [0.0.1] - 2022-12-19

### Added

- Initial implementation ported from internal project

[unreleased]: https://github.com/richardscarrott/react-snap-carousel/compare/v0.2.0...HEAD
[0.3.1]: https://github.com/richardscarrott/react-snap-carousel/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/richardscarrott/react-snap-carousel/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/richardscarrott/react-snap-carousel/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/richardscarrott/react-snap-carousel/compare/v0.0.3...v0.1.0
[0.0.3]: https://github.com/richardscarrott/react-snap-carousel/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/richardscarrott/react-snap-carousel/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/richardscarrott/react-snap-carousel/releases/tag/v0.0.1
